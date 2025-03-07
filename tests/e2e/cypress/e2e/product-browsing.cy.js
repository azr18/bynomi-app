// tests/e2e/cypress/e2e/product-browsing.cy.js
describe('Product Browsing and Cart Functionality', () => {
  beforeEach(() => {
    // Mock the products API response
    cy.intercept('GET', '/api/products*', { fixture: 'products.json' }).as('getProducts');
    cy.intercept('GET', '/api/products/*', { fixture: 'product-detail.json' }).as('getProductDetail');
    
    // Visit the homepage before each test
    cy.visit('/');
    cy.wait('@getProducts');
  });
  
  it('displays products on the homepage', () => {
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 3);
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="product-name"]').should('be.visible');
      cy.get('[data-testid="product-price"]').should('be.visible');
      cy.get('[data-testid="product-image"]').should('be.visible');
    });
  });
  
  it('filters products by category', () => {
    // Click on the tablecloths category
    cy.get('[data-testid="category-filter"]').contains('Tablecloths').click();
    cy.wait('@getProducts');
    
    // Verify URL has the correct query parameter
    cy.url().should('include', 'category=tablecloths');
    
    // Verify only tablecloth products are shown
    cy.get('[data-testid="product-card"]').each(($card) => {
      cy.wrap($card).find('[data-testid="product-category"]').should('contain', 'Tablecloth');
    });
  });
  
  it('navigates to product detail page when clicking on a product', () => {
    // Click on the first product
    cy.get('[data-testid="product-card"]').first().click();
    cy.wait('@getProductDetail');
    
    // Verify we're on the product detail page
    cy.url().should('include', '/products/');
    
    // Verify product detail page shows correct information
    cy.get('[data-testid="product-detail-name"]').should('be.visible');
    cy.get('[data-testid="product-detail-price"]').should('be.visible');
    cy.get('[data-testid="product-detail-description"]').should('be.visible');
    cy.get('[data-testid="product-detail-image"]').should('be.visible');
  });
  
  it('adds a product to cart from the quick add button', () => {
    // Click the "Quick Add" button on the first product
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="quick-add-button"]').click();
    });
    
    // Verify cart icon shows 1 item
    cy.get('[data-testid="cart-count"]').should('contain', '1');
    
    // Open the cart
    cy.get('[data-testid="cart-button"]').click();
    
    // Verify product is in the cart
    cy.get('[data-testid="cart-item"]').should('have.length', 1);
  });
  
  it('adds a product to cart from product detail page', () => {
    // Navigate to product detail page
    cy.get('[data-testid="product-card"]').first().click();
    cy.wait('@getProductDetail');
    
    // Select quantity
    cy.get('[data-testid="quantity-selector"]').clear().type('2');
    
    // Add to cart
    cy.get('[data-testid="add-to-cart-button"]').click();
    
    // Verify cart icon shows 2 items
    cy.get('[data-testid="cart-count"]').should('contain', '2');
    
    // Open the cart
    cy.get('[data-testid="cart-button"]').click();
    
    // Verify product is in the cart with quantity 2
    cy.get('[data-testid="cart-item"]').should('have.length', 1);
    cy.get('[data-testid="cart-item-quantity"]').should('contain', '2');
  });
  
  it('handles custom dimensions for tablecloths', () => {
    // Navigate to a tablecloth product detail page
    cy.intercept('GET', '/api/products/*', { fixture: 'tablecloth-product.json' }).as('getTablecloth');
    cy.visit('/products/prod-1');
    cy.wait('@getTablecloth');
    
    // Check if custom dimensions form is available
    cy.get('[data-testid="custom-dimensions-toggle"]').should('be.visible').click();
    
    // Enter custom dimensions
    cy.get('[data-testid="width-input"]').clear().type('60');
    cy.get('[data-testid="length-input"]').clear().type('102');
    
    // Verify price updates based on dimensions
    cy.get('[data-testid="calculated-price"]').should('be.visible');
    
    // Add to cart with custom dimensions
    cy.get('[data-testid="add-to-cart-button"]').click();
    
    // Open the cart
    cy.get('[data-testid="cart-button"]').click();
    
    // Verify custom dimensions are shown in cart
    cy.get('[data-testid="cart-item-dimensions"]').should('contain', '60" × 102"');
  });
  
  it('removes products from cart', () => {
    // Add a product to cart
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="quick-add-button"]').click();
    });
    
    // Open the cart
    cy.get('[data-testid="cart-button"]').click();
    
    // Remove the product
    cy.get('[data-testid="remove-item-button"]').click();
    
    // Verify cart is empty
    cy.get('[data-testid="empty-cart-message"]').should('be.visible');
    cy.get('[data-testid="cart-count"]').should('not.exist');
  });
  
  it('updates product quantity in cart', () => {
    // Add a product to cart
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.get('[data-testid="quick-add-button"]').click();
    });
    
    // Open the cart
    cy.get('[data-testid="cart-button"]').click();
    
    // Increase quantity
    cy.get('[data-testid="increase-quantity-button"]').click();
    
    // Verify quantity is updated
    cy.get('[data-testid="cart-item-quantity"]').should('contain', '2');
    
    // Decrease quantity
    cy.get('[data-testid="decrease-quantity-button"]').click();
    
    // Verify quantity is updated
    cy.get('[data-testid="cart-item-quantity"]').should('contain', '1');
  });
});