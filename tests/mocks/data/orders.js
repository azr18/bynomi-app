// tests/mocks/data/orders.js
export const mockOrders = [
  {
    id: 'order-1',
    user_id: 'user-1',
    status: 'completed',
    total: 139.97,
    shipping_address: {
      id: 'addr-1',
      first_name: 'John',
      last_name: 'Doe',
      address_line1: '123 Main St',
      address_line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'US',
      phone: '212-555-1234'
    },
    billing_address: {
      id: 'addr-1',
      first_name: 'John',
      last_name: 'Doe',
      address_line1: '123 Main St',
      address_line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'US',
      phone: '212-555-1234'
    },
    items: [
      {
        id: 'item-1-1',
        product_id: 'prod-1',
        name: 'Classic White Tablecloth',
        quantity: 1,
        price: 49.99,
        custom_size: {
          width: 60,
          length: 102,
          square_feet: 42.5,
          price_per_sqft: 1.0
        },
        subtotal: 92.49
      },
      {
        id: 'item-1-2',
        product_id: 'prod-3',
        name: 'Linen Napkins (Set of 6)',
        quantity: 1,
        price: 39.99,
        custom_size: null,
        subtotal: 39.99
      }
    ],
    payment: {
      method: 'credit_card',
      card_brand: 'visa',
      last4: '4242',
      status: 'succeeded'
    },
    tracking: {
      number: 'TRK123456789',
      url: 'https://example.com/track/TRK123456789',
      carrier: 'UPS'
    },
    created_at: '2024-02-10T15:30:00Z',
    updated_at: '2024-02-12T09:15:00Z'
  },
  {
    id: 'order-2',
    user_id: 'user-1',
    status: 'processing',
    total: 59.99,
    shipping_address: {
      id: 'addr-1',
      first_name: 'John',
      last_name: 'Doe',
      address_line1: '123 Main St',
      address_line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'US',
      phone: '212-555-1234'
    },
    billing_address: {
      id: 'addr-1',
      first_name: 'John',
      last_name: 'Doe',
      address_line1: '123 Main St',
      address_line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'US',
      phone: '212-555-1234'
    },
    items: [
      {
        id: 'item-2-1',
        product_id: 'prod-4',
        name: 'Gold-Plated Napkin Rings (Set of 8)',
        quantity: 1,
        price: 59.99,
        custom_size: null,
        subtotal: 59.99
      }
    ],
    payment: {
      method: 'credit_card',
      card_brand: 'mastercard',
      last4: '5678',
      status: 'succeeded'
    },
    tracking: null,
    created_at: '2024-03-01T10:45:00Z',
    updated_at: '2024-03-01T10:45:00Z'
  },
  {
    id: 'order-3',
    user_id: 'user-1',
    status: 'shipped',
    total: 84.98,
    shipping_address: {
      id: 'addr-2',
      first_name: 'John',
      last_name: 'Doe',
      address_line1: '456 Park Ave',
      address_line2: null,
      city: 'Boston',
      state: 'MA',
      postal_code: '02115',
      country: 'US',
      phone: '617-555-9876'
    },
    billing_address: {
      id: 'addr-1',
      first_name: 'John',
      last_name: 'Doe',
      address_line1: '123 Main St',
      address_line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'US',
      phone: '212-555-1234'
    },
    items: [
      {
        id: 'item-3-1',
        product_id: 'prod-2',
        name: 'Blue Striped Placemats (Set of 4)',
        quantity: 1,
        price: 29.99,
        custom_size: null,
        subtotal: 29.99
      },
      {
        id: 'item-3-2',
        product_id: 'prod-3',
        name: 'Linen Napkins (Set of 6)',
        quantity: 1,
        price: 39.99,
        custom_size: null,
        subtotal: 39.99
      },
      {
        id: 'item-3-3',
        product_id: 'prod-5',
        name: 'Floral Pattern Tablecloth',
        quantity: 1,
        price: 54.99,
        custom_size: null,
        subtotal: 15.00
      }
    ],
    payment: {
      method: 'credit_card',
      card_brand: 'amex',
      last4: '0005',
      status: 'succeeded'
    },
    tracking: {
      number: 'TRK987654321',
      url: 'https://example.com/track/TRK987654321',
      carrier: 'FedEx'
    },
    created_at: '2024-03-05T14:20:00Z',
    updated_at: '2024-03-06T11:30:00Z'
  }
];