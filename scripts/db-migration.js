#!/usr/bin/env node
/**
 * Bynomi Database Migration Script
 * 
 * This script manages the migration of the database schema and data 
 * from one environment to another (e.g., development to production).
 * 
 * Usage:
 *   node scripts/db-migration.js --from=dev --to=prod [--data] [--schema] [--tables=table1,table2]
 * 
 * Options:
 *   --from=ENV          Source environment (dev, staging, prod)
 *   --to=ENV            Target environment (dev, staging, prod)
 *   --data              Migrate data (default: false)
 *   --schema            Migrate schema (default: true)
 *   --tables=TABLE,...  Specific tables to migrate (comma-separated)
 *   --dry-run           Run without making changes
 *   --help              Show this help message
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Configure command-line options
program
  .option('--from <env>', 'Source environment')
  .option('--to <env>', 'Target environment')
  .option('--data', 'Migrate data', false)
  .option('--schema', 'Migrate schema', true)
  .option('--tables <tables>', 'Specific tables to migrate (comma-separated)')
  .option('--dry-run', 'Run without making changes', false)
  .option('--help', 'Show help', false);

program.parse(process.argv);
const options = program.opts();

// Show help if requested
if (options.help) {
  console.log(`
Bynomi Database Migration Script

Usage:
  node scripts/db-migration.js --from=dev --to=prod [--data] [--schema] [--tables=table1,table2]

Options:
  --from=ENV          Source environment (dev, staging, prod)
  --to=ENV            Target environment (dev, staging, prod)
  --data              Migrate data (default: false)
  --schema            Migrate schema (default: true)
  --tables=TABLE,...  Specific tables to migrate (comma-separated)
  --dry-run           Run without making changes
  --help              Show this help message
  `);
  process.exit(0);
}

// Validate required options
if (!options.from || !options.to) {
  console.error('Error: --from and --to environment parameters are required');
  process.exit(1);
}

// Load environment variables based on source and target environments
const loadEnvironment = (env) => {
  const envPath = path.resolve(__dirname, `../config/${env}.env`);
  
  if (!fs.existsSync(envPath)) {
    console.error(`Error: Environment file not found: ${envPath}`);
    process.exit(1);
  }
  
  return dotenv.parse(fs.readFileSync(envPath));
};

const sourceEnv = loadEnvironment(options.from);
const targetEnv = loadEnvironment(options.to);

// Create Supabase clients for source and target environments
const sourceClient = createClient(
  sourceEnv.NEXT_PUBLIC_SUPABASE_URL,
  sourceEnv.SUPABASE_SERVICE_ROLE_KEY
);

const targetClient = createClient(
  targetEnv.NEXT_PUBLIC_SUPABASE_URL,
  targetEnv.SUPABASE_SERVICE_ROLE_KEY
);

// Parse tables option if provided
const tables = options.tables ? options.tables.split(',') : null;

// Define the tables and their relationships for ordered migration
const tableDefinitions = [
  { name: 'categories', dependencies: [] },
  { name: 'products', dependencies: ['categories'] },
  { name: 'product_images', dependencies: ['products'] },
  { name: 'price_tiers', dependencies: ['products'] },
  { name: 'users', dependencies: [] },
  { name: 'addresses', dependencies: ['users'] },
  { name: 'orders', dependencies: ['users', 'addresses'] },
  { name: 'order_items', dependencies: ['orders', 'products'] },
  { name: 'blog_posts', dependencies: [] },
  { name: 'blog_categories', dependencies: [] },
  { name: 'blog_post_categories', dependencies: ['blog_posts', 'blog_categories'] },
];

// Sort tables based on dependencies
const sortTablesByDependencies = () => {
  const result = [];
  const visited = new Set();
  const visiting = new Set();

  function visit(tableName) {
    if (visited.has(tableName)) return;
    if (visiting.has(tableName)) {
      throw new Error(`Circular dependency detected for table: ${tableName}`);
    }

    visiting.add(tableName);

    const table = tableDefinitions.find(t => t.name === tableName);
    if (!table) {
      throw new Error(`Table definition not found for: ${tableName}`);
    }

    for (const dep of table.dependencies) {
      visit(dep);
    }

    visiting.delete(tableName);
    visited.add(tableName);
    result.push(tableName);
  }

  // If specific tables are provided, sort only those
  const tablesToSort = tables || tableDefinitions.map(t => t.name);
  
  for (const tableName of tablesToSort) {
    if (!visited.has(tableName)) {
      visit(tableName);
    }
  }

  return result;
};

// Export schema for a table
const exportTableSchema = async (tableName) => {
  console.log(`Exporting schema for table: ${tableName}`);
  if (options.dryRun) {
    console.log('  [DRY RUN] - Schema export would happen here');
    return { name: tableName, schema: {} };
  }

  try {
    const { data, error } = await sourceClient.rpc('get_table_schema', { table_name: tableName });
    if (error) throw error;
    return { name: tableName, schema: data };
  } catch (error) {
    console.error(`Error exporting schema for ${tableName}:`, error.message);
    throw error;
  }
};

// Import schema for a table
const importTableSchema = async (tableSchema) => {
  const { name, schema } = tableSchema;
  console.log(`Importing schema for table: ${name}`);
  
  if (options.dryRun) {
    console.log('  [DRY RUN] - Schema import would happen here');
    return;
  }

  try {
    const { error } = await targetClient.rpc('apply_table_schema', { 
      table_name: name, 
      schema_definition: schema 
    });
    
    if (error) throw error;
    console.log(`  Schema imported successfully for ${name}`);
  } catch (error) {
    console.error(`Error importing schema for ${name}:`, error.message);
    throw error;
  }
};

// Export data for a table
const exportTableData = async (tableName) => {
  console.log(`Exporting data for table: ${tableName}`);
  
  if (options.dryRun) {
    console.log('  [DRY RUN] - Data export would happen here');
    return { name: tableName, data: [] };
  }

  try {
    const { data, error } = await sourceClient.from(tableName).select('*');
    if (error) throw error;
    console.log(`  Exported ${data.length} rows from ${tableName}`);
    return { name: tableName, data };
  } catch (error) {
    console.error(`Error exporting data for ${tableName}:`, error.message);
    throw error;
  }
};

// Import data for a table
const importTableData = async (tableData) => {
  const { name, data } = tableData;
  
  if (data.length === 0) {
    console.log(`No data to import for table: ${name}`);
    return;
  }
  
  console.log(`Importing ${data.length} rows into table: ${name}`);
  
  if (options.dryRun) {
    console.log('  [DRY RUN] - Data import would happen here');
    return;
  }

  try {
    // Clear existing data first
    const { error: clearError } = await targetClient.from(name).delete().neq('id', 0);
    if (clearError) throw clearError;
    
    // Import data in batches to avoid rate limits
    const batchSize = 100;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const { error } = await targetClient.from(name).insert(batch);
      if (error) throw error;
      console.log(`  Imported batch ${i / batchSize + 1} of ${Math.ceil(data.length / batchSize)}`);
    }
    
    console.log(`  Data imported successfully for ${name}`);
  } catch (error) {
    console.error(`Error importing data for ${name}:`, error.message);
    throw error;
  }
};

// Main migration function
const migrate = async () => {
  try {
    console.log(`
======================================
Bynomi Database Migration
======================================
From: ${options.from}
To: ${options.to}
Schema migration: ${options.schema ? 'Yes' : 'No'}
Data migration: ${options.data ? 'Yes' : 'No'}
Tables: ${tables ? tables.join(', ') : 'All'}
Dry run: ${options.dryRun ? 'Yes' : 'No'}
======================================
`);

    // Sort tables by dependencies
    const sortedTables = sortTablesByDependencies();
    console.log('Migration order:', sortedTables.join(', '));

    // Migrate schema if requested
    if (options.schema) {
      console.log('\n--- Schema Migration ---');
      for (const tableName of sortedTables) {
        const tableSchema = await exportTableSchema(tableName);
        await importTableSchema(tableSchema);
      }
    }

    // Migrate data if requested
    if (options.data) {
      console.log('\n--- Data Migration ---');
      for (const tableName of sortedTables) {
        const tableData = await exportTableData(tableName);
        await importTableData(tableData);
      }
    }

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
};

// Run the migration
migrate();