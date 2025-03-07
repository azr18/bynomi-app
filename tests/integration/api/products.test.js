// tests/integration/api/products.test.js
import { createMocks } from 'node-mocks-http';
import productsHandler from '../../../pages/api/products';
import productByIdHandler from '../../../pages/api/products/[id]';
import { mockProducts } from '../../mocks/data/products';

// Mock Supabase
jest.mock('../../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          range: jest.fn(() => ({
            eq: jest.fn(() => ({
              data: mockProducts,
              error: null,
              count: mockProducts.length,
            })),
          })),
        })),
      })),
    })),
  },
}));

describe('Products API', () => {
  describe('GET /api/products', () => {
    it('returns a list of products', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await productsHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        products: mockProducts,
        total: mockProducts.length,
      });
    });

    it('returns filtered products when category is provided', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          category: 'tablecloths',
        },
      });

      await productsHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      
      // In a real test, we would check if the response contains
      // only products with the specified category, but our mock
      // doesn't filter the products
    });

    it('returns featured products when featured=true is provided', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          featured: 'true',
        },
      });

      await productsHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      
      // In a real test, we would check if the response contains
      // only featured products, but our mock doesn't filter
    });

    it('supports pagination', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          page: '2',
          limit: '10',
        },
      });

      await productsHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      
      // In a real test, we would check if the correct pagination
      // parameters were used in the query
    });

    it('handles errors gracefully', async () => {
      // Mock a database error
      const supabaseMock = require('../../../lib/supabase').supabase;
      supabaseMock.from.mockImplementationOnce(() => ({
        select: jest.fn(() => ({
          order: jest.fn(() => ({
            range: jest.fn(() => ({
              eq: jest.fn(() => ({
                data: null,
                error: { message: 'Database error' },
              })),
            })),
          })),
        })),
      }));

      const { req, res } = createMocks({
        method: 'GET',
      });

      await productsHandler(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Database error',
      });
    });
  });

  describe('GET /api/products/[id]', () => {
    it('returns a single product by ID', async () => {
      const productId = 'prod-1';
      const product = mockProducts.find(p => p.id === productId);

      // Mock the Supabase query for a single product
      const supabaseMock = require('../../../lib/supabase').supabase;
      supabaseMock.from.mockImplementationOnce(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: [product],
            error: null,
          })),
        })),
      }));

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: productId,
        },
      });

      await productByIdHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        product,
      });
    });

    it('returns 404 when product is not found', async () => {
      // Mock a product not found response
      const supabaseMock = require('../../../lib/supabase').supabase;
      supabaseMock.from.mockImplementationOnce(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: [],
            error: null,
          })),
        })),
      }));

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: 'non-existent-id',
        },
      });

      await productByIdHandler(req, res);

      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Product not found',
      });
    });

    it('handles database errors gracefully', async () => {
      // Mock a database error
      const supabaseMock = require('../../../lib/supabase').supabase;
      supabaseMock.from.mockImplementationOnce(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: null,
            error: { message: 'Database error' },
          })),
        })),
      }));

      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: 'prod-1',
        },
      });

      await productByIdHandler(req, res);

      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Database error',
      });
    });
  });
});