// tests/mocks/data/user.js
export const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Doe',
  phone: '212-555-1234',
  created_at: '2024-01-01T09:00:00Z',
  updated_at: '2024-02-15T14:30:00Z',
  addresses: [
    {
      id: 'addr-1',
      user_id: 'user-1',
      first_name: 'John',
      last_name: 'Doe',
      address_line1: '123 Main St',
      address_line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'US',
      phone: '212-555-1234',
      is_default: true,
      created_at: '2024-01-01T09:30:00Z',
      updated_at: '2024-01-01T09:30:00Z'
    },
    {
      id: 'addr-2',
      user_id: 'user-1',
      first_name: 'John',
      last_name: 'Doe',
      address_line1: '456 Park Ave',
      address_line2: null,
      city: 'Boston',
      state: 'MA',
      postal_code: '02115',
      country: 'US',
      phone: '617-555-9876',
      is_default: false,
      created_at: '2024-02-10T11:15:00Z',
      updated_at: '2024-02-10T11:15:00Z'
    }
  ],
  payment_methods: [
    {
      id: 'pm-1',
      user_id: 'user-1',
      type: 'credit_card',
      card_brand: 'visa',
      last4: '4242',
      exp_month: 12,
      exp_year: 2025,
      is_default: true,
      created_at: '2024-01-01T10:00:00Z',
      updated_at: '2024-01-01T10:00:00Z'
    },
    {
      id: 'pm-2',
      user_id: 'user-1',
      type: 'credit_card',
      card_brand: 'mastercard',
      last4: '5678',
      exp_month: 10,
      exp_year: 2024,
      is_default: false,
      created_at: '2024-02-15T14:30:00Z',
      updated_at: '2024-02-15T14:30:00Z'
    }
  ]
};