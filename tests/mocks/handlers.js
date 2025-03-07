// tests/mocks/handlers.js
import { rest } from 'msw';
import { mockProducts } from './data/products';
import { mockOrders } from './data/orders';
import { mockBlogPosts } from './data/blogPosts';
import { mockUser } from './data/user';

export const handlers = [
  // Products API
  rest.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        products: mockProducts,
        total: mockProducts.length
      })
    );
  }),

  rest.get('/api/products/:id', (req, res, ctx) => {
    const { id } = req.params;
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Product not found' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ product })
    );
  }),

  // Orders API
  rest.get('/api/orders', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        orders: mockOrders,
        total: mockOrders.length
      })
    );
  }),

  rest.get('/api/orders/:id', (req, res, ctx) => {
    const { id } = req.params;
    const order = mockOrders.find(o => o.id === id);

    if (!order) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Order not found' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ order })
    );
  }),

  // Blog API
  rest.get('/api/blog', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        posts: mockBlogPosts,
        total: mockBlogPosts.length
      })
    );
  }),

  rest.get('/api/blog/:slug', (req, res, ctx) => {
    const { slug } = req.params;
    const post = mockBlogPosts.find(p => p.slug === slug);

    if (!post) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Blog post not found' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ post })
    );
  }),

  // Authentication API
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === 'test@example.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          user: mockUser,
          token: 'mock-token-12345'
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({ message: 'Invalid credentials' })
    );
  }),

  rest.post('/api/auth/register', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user: mockUser,
        token: 'mock-token-12345'
      })
    );
  }),

  // Checkout API
  rest.post('/api/checkout/payment-intent', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        clientSecret: 'mock-client-secret',
        orderId: 'order-123'
      })
    );
  }),

  // User Profile API
  rest.get('/api/user/profile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ user: mockUser })
    );
  }),

  rest.put('/api/user/profile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ user: { ...mockUser, ...req.body } })
    );
  }),

  // Addresses API
  rest.get('/api/user/addresses', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ addresses: mockUser.addresses })
    );
  }),
];