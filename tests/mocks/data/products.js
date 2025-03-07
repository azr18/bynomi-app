// tests/mocks/data/products.js
export const mockProducts = [
  {
    id: 'prod-1',
    name: 'Classic White Tablecloth',
    description: 'Elegant white tablecloth perfect for any occasion. Made from high-quality cotton for durability and stain resistance.',
    price: 49.99,
    category: 'tablecloths',
    stock_status: 'in_stock',
    featured: true,
    images: [
      {
        id: 'img-1-1',
        url: '/assets/products/classic-white-tablecloth-1.jpg',
        alt: 'Classic white tablecloth on a dining table',
        is_primary: true
      },
      {
        id: 'img-1-2',
        url: '/assets/products/classic-white-tablecloth-2.jpg',
        alt: 'Close-up of classic white tablecloth material',
        is_primary: false
      }
    ],
    custom_options: {
      has_custom_size: true,
      price_tiers: [
        { min_sqft: 0, max_sqft: 25, price_per_sqft: 1.2 },
        { min_sqft: 25, max_sqft: 50, price_per_sqft: 1.0 },
        { min_sqft: 50, max_sqft: 100, price_per_sqft: 0.9 },
        { min_sqft: 100, max_sqft: null, price_per_sqft: 0.8 }
      ]
    },
    created_at: '2024-01-01T12:00:00Z',
    updated_at: '2024-02-15T14:30:00Z'
  },
  {
    id: 'prod-2',
    name: 'Blue Striped Placemats (Set of 4)',
    description: 'Add a touch of coastal elegance with these blue striped placemats. Water-resistant and easy to clean.',
    price: 29.99,
    category: 'placemats',
    stock_status: 'in_stock',
    featured: false,
    images: [
      {
        id: 'img-2-1',
        url: '/assets/products/blue-striped-placemats-1.jpg',
        alt: 'Set of 4 blue striped placemats',
        is_primary: true
      },
      {
        id: 'img-2-2',
        url: '/assets/products/blue-striped-placemats-2.jpg',
        alt: 'Close-up of blue striped placemat pattern',
        is_primary: false
      }
    ],
    custom_options: {
      has_custom_size: false
    },
    created_at: '2024-01-05T10:30:00Z',
    updated_at: '2024-01-05T10:30:00Z'
  },
  {
    id: 'prod-3',
    name: 'Linen Napkins (Set of 6)',
    description: 'Luxurious linen napkins in a neutral color that complements any table setting. Durable and machine washable.',
    price: 39.99,
    category: 'napkins',
    stock_status: 'in_stock',
    featured: true,
    images: [
      {
        id: 'img-3-1',
        url: '/assets/products/linen-napkins-1.jpg',
        alt: 'Set of 6 linen napkins folded neatly',
        is_primary: true
      },
      {
        id: 'img-3-2',
        url: '/assets/products/linen-napkins-2.jpg',
        alt: 'Linen napkin in a decorative fold',
        is_primary: false
      }
    ],
    custom_options: {
      has_custom_size: false
    },
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-10T09:15:00Z'
  },
  {
    id: 'prod-4',
    name: 'Gold-Plated Napkin Rings (Set of 8)',
    description: 'Add a touch of luxury with these elegant gold-plated napkin rings. Perfect for special occasions and holiday gatherings.',
    price: 59.99,
    category: 'napkin_rings',
    stock_status: 'in_stock',
    featured: true,
    images: [
      {
        id: 'img-4-1',
        url: '/assets/products/gold-napkin-rings-1.jpg',
        alt: 'Set of 8 gold-plated napkin rings',
        is_primary: true
      },
      {
        id: 'img-4-2',
        url: '/assets/products/gold-napkin-rings-2.jpg',
        alt: 'Close-up of gold-plated napkin ring detail',
        is_primary: false
      }
    ],
    custom_options: {
      has_custom_size: false
    },
    created_at: '2024-01-15T11:45:00Z',
    updated_at: '2024-01-15T11:45:00Z'
  },
  {
    id: 'prod-5',
    name: 'Floral Pattern Tablecloth',
    description: 'Beautiful floral pattern tablecloth that brings nature to your dining table. Stain-resistant and machine washable.',
    price: 54.99,
    category: 'tablecloths',
    stock_status: 'in_stock',
    featured: false,
    images: [
      {
        id: 'img-5-1',
        url: '/assets/products/floral-tablecloth-1.jpg',
        alt: 'Floral pattern tablecloth on a dining table',
        is_primary: true
      },
      {
        id: 'img-5-2',
        url: '/assets/products/floral-tablecloth-2.jpg',
        alt: 'Close-up of floral pattern tablecloth design',
        is_primary: false
      }
    ],
    custom_options: {
      has_custom_size: true,
      price_tiers: [
        { min_sqft: 0, max_sqft: 25, price_per_sqft: 1.3 },
        { min_sqft: 25, max_sqft: 50, price_per_sqft: 1.1 },
        { min_sqft: 50, max_sqft: 100, price_per_sqft: 1.0 },
        { min_sqft: 100, max_sqft: null, price_per_sqft: 0.9 }
      ]
    },
    created_at: '2024-01-20T13:20:00Z',
    updated_at: '2024-01-20T13:20:00Z'
  }
];