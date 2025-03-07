# Bynomi API Documentation

This document provides detailed information about the Bynomi API endpoints, parameters, and response formats.

## Base URL

All API endpoints are relative to:

- Development: `http://localhost:3000/api`
- Production: `https://bynomi.com/api`

## Authentication

Protected endpoints require an authentication token. Include the token in the `Authorization` header:

```
Authorization: Bearer {token}
```

Authentication tokens can be obtained through the `/api/auth/login` endpoint.

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "error": "Error message describing what went wrong"
}
```

HTTP status codes are used appropriately:

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: User does not have permission
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## Rate Limiting

API requests are limited to 200 requests per minute per IP address. The following headers are included in responses:

- `X-RateLimit-Limit`: Maximum requests per minute
- `X-RateLimit-Remaining`: Remaining requests in the current window
- `X-RateLimit-Reset`: Time (in seconds) until the rate limit resets

## Products API

### Get Products

Retrieves a list of products with optional filtering and pagination.

**Endpoint:** `GET /api/products`

**Query Parameters:**

| Parameter   | Type     | Description                                     | Default |
|-------------|----------|-------------------------------------------------|---------|
| `page`      | number   | Page number for pagination                      | 1       |
| `limit`     | number   | Number of products per page                     | 10      |
| `category`  | string   | Filter by category                              | -       |
| `featured`  | boolean  | Filter by featured status                       | -       |
| `search`    | string   | Search term for product name and description    | -       |
| `sort`      | string   | Field to sort by (name, price, created_at)      | name    |
| `order`     | string   | Sort order (asc, desc)                          | asc     |

**Response:**

```json
{
  "products": [
    {
      "id": "product-id",
      "name": "Product Name",
      "description": "Product description",
      "price": 49.99,
      "category": "tablecloths",
      "stock_status": "in_stock",
      "featured": true,
      "images": [
        {
          "id": "image-id",
          "url": "/assets/products/image.jpg",
          "alt": "Image alt text",
          "is_primary": true
        }
      ],
      "custom_options": {
        "has_custom_size": true,
        "price_tiers": [
          {
            "min_sqft": 0,
            "max_sqft": 25,
            "price_per_sqft": 1.2
          }
        ]
      }
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "total_pages": 10
}
```

### Get Product by ID

Retrieves a single product by its ID.

**Endpoint:** `GET /api/products/:id`

**Path Parameters:**

| Parameter | Type   | Description     |
|-----------|--------|-----------------|
| `id`      | string | Product ID      |

**Response:**

```json
{
  "product": {
    "id": "product-id",
    "name": "Product Name",
    "description": "Product description",
    "price": 49.99,
    "category": "tablecloths",
    "stock_status": "in_stock",
    "featured": true,
    "images": [
      {
        "id": "image-id",
        "url": "/assets/products/image.jpg",
        "alt": "Image alt text",
        "is_primary": true
      }
    ],
    "custom_options": {
      "has_custom_size": true,
      "price_tiers": [
        {
          "min_sqft": 0,
          "max_sqft": 25,
          "price_per_sqft": 1.2
        }
      ]
    }
  }
}
```

### Create Product

Creates a new product. Requires admin authentication.

**Endpoint:** `POST /api/products`

**Request Body:**

```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 49.99,
  "category": "tablecloths",
  "stock_status": "in_stock",
  "featured": true,
  "custom_options": {
    "has_custom_size": true,
    "price_tiers": [
      {
        "min_sqft": 0,
        "max_sqft": 25,
        "price_per_sqft": 1.2
      }
    ]
  }
}
```

**Response:**

```json
{
  "product": {
    "id": "product-id",
    "name": "Product Name",
    "description": "Product description",
    "price": 49.99,
    "category": "tablecloths",
    "stock_status": "in_stock",
    "featured": true,
    "images": [],
    "custom_options": {
      "has_custom_size": true,
      "price_tiers": [
        {
          "min_sqft": 0,
          "max_sqft": 25,
          "price_per_sqft": 1.2
        }
      ]
    },
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-01T12:00:00Z"
  }
}
```

### Update Product

Updates an existing product. Requires admin authentication.

**Endpoint:** `PUT /api/products/:id`

**Path Parameters:**

| Parameter | Type   | Description     |
|-----------|--------|-----------------|
| `id`      | string | Product ID      |

**Request Body:**

```json
{
  "name": "Updated Product Name",
  "description": "Updated product description",
  "price": 59.99,
  "category": "tablecloths",
  "stock_status": "in_stock",
  "featured": true,
  "custom_options": {
    "has_custom_size": true,
    "price_tiers": [
      {
        "min_sqft": 0,
        "max_sqft": 25,
        "price_per_sqft": 1.2
      }
    ]
  }
}
```

**Response:**

```json
{
  "product": {
    "id": "product-id",
    "name": "Updated Product Name",
    "description": "Updated product description",
    "price": 59.99,
    "category": "tablecloths",
    "stock_status": "in_stock",
    "featured": true,
    "images": [
      {
        "id": "image-id",
        "url": "/assets/products/image.jpg",
        "alt": "Image alt text",
        "is_primary": true
      }
    ],
    "custom_options": {
      "has_custom_size": true,
      "price_tiers": [
        {
          "min_sqft": 0,
          "max_sqft": 25,
          "price_per_sqft": 1.2
        }
      ]
    },
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-02T12:00:00Z"
  }
}
```

### Delete Product

Deletes a product. Requires admin authentication.

**Endpoint:** `DELETE /api/products/:id`

**Path Parameters:**

| Parameter | Type   | Description     |
|-----------|--------|-----------------|
| `id`      | string | Product ID      |

**Response:**

```json
{
  "message": "Product deleted successfully"
}
```

## Orders API

### Get Orders

Retrieves a list of orders for the authenticated user, or all orders for admin users.

**Endpoint:** `GET /api/orders`

**Query Parameters:**

| Parameter   | Type     | Description                                     | Default |
|-------------|----------|-------------------------------------------------|---------|
| `page`      | number   | Page number for pagination                      | 1       |
| `limit`     | number   | Number of orders per page                       | 10      |
| `status`    | string   | Filter by order status                          | -       |
| `sort`      | string   | Field to sort by (created_at, total)            | created_at |
| `order`     | string   | Sort order (asc, desc)                          | desc    |

**Response:**

```json
{
  "orders": [
    {
      "id": "order-id",
      "user_id": "user-id",
      "status": "completed",
      "total": 139.97,
      "shipping_address": {
        "id": "address-id",
        "first_name": "John",
        "last_name": "Doe",
        "address_line1": "123 Main St",
        "address_line2": "Apt 4B",
        "city": "New York",
        "state": "NY",
        "postal_code": "10001",
        "country": "US",
        "phone": "212-555-1234"
      },
      "created_at": "2024-02-10T15:30:00Z",
      "updated_at": "2024-02-12T09:15:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "total_pages": 3
}
```

### Get Order by ID

Retrieves a single order by its ID. Users can only access their own orders, while admins can access any order.

**Endpoint:** `GET /api/orders/:id`

**Path Parameters:**

| Parameter | Type   | Description     |
|-----------|--------|-----------------|
| `id`      | string | Order ID        |

**Response:**

```json
{
  "order": {
    "id": "order-id",
    "user_id": "user-id",
    "status": "completed",
    "total": 139.97,
    "shipping_address": {
      "id": "address-id",
      "first_name": "John",
      "last_name": "Doe",
      "address_line1": "123 Main St",
      "address_line2": "Apt 4B",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "US",
      "phone": "212-555-1234"
    },
    "billing_address": {
      "id": "address-id",
      "first_name": "John",
      "last_name": "Doe",
      "address_line1": "123 Main St",
      "address_line2": "Apt 4B",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "US",
      "phone": "212-555-1234"
    },
    "items": [
      {
        "id": "item-id",
        "product_id": "product-id",
        "name": "Product Name",
        "quantity": 1,
        "price": 49.99,
        "custom_size": {
          "width": 60,
          "length": 102,
          "square_feet": 42.5,
          "price_per_sqft": 1.0
        },
        "subtotal": 92.49
      }
    ],
    "payment": {
      "method": "credit_card",
      "card_brand": "visa",
      "last4": "4242",
      "status": "succeeded"
    },
    "tracking": {
      "number": "TRK123456789",
      "url": "https://example.com/track/TRK123456789",
      "carrier": "UPS"
    },
    "created_at": "2024-02-10T15:30:00Z",
    "updated_at": "2024-02-12T09:15:00Z"
  }
}
```

### Update Order Status

Updates the status of an order. Requires admin authentication.

**Endpoint:** `PATCH /api/orders/:id/status`

**Path Parameters:**

| Parameter | Type   | Description     |
|-----------|--------|-----------------|
| `id`      | string | Order ID        |

**Request Body:**

```json
{
  "status": "shipped",
  "tracking": {
    "number": "TRK123456789",
    "url": "https://example.com/track/TRK123456789",
    "carrier": "UPS"
  }
}
```

**Response:**

```json
{
  "order": {
    "id": "order-id",
    "status": "shipped",
    "tracking": {
      "number": "TRK123456789",
      "url": "https://example.com/track/TRK123456789",
      "carrier": "UPS"
    },
    "updated_at": "2024-03-01T09:15:00Z"
  }
}
```

## Authentication API

### Login

Authenticates a user and returns a session token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**

```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "token": "authentication-token"
}
```

### Register

Creates a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "212-555-1234"
}
```

**Response:**

```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "token": "authentication-token"
}
```

### Reset Password Request

Initiates a password reset request.

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "Password reset email sent"
}
```

## Blog API

### Get Blog Posts

Retrieves a list of blog posts with optional filtering and pagination.

**Endpoint:** `GET /api/blog`

**Query Parameters:**

| Parameter   | Type     | Description                                     | Default |
|-------------|----------|-------------------------------------------------|---------|
| `page`      | number   | Page number for pagination                      | 1       |
| `limit`     | number   | Number of posts per page                        | 10      |
| `category`  | string   | Filter by category                              | -       |
| `search`    | string   | Search term for post title and content          | -       |
| `sort`      | string   | Field to sort by (published_at, title)          | published_at |
| `order`     | string   | Sort order (asc, desc)                          | desc    |

**Response:**

```json
{
  "posts": [
    {
      "id": "post-id",
      "title": "Blog Post Title",
      "slug": "blog-post-title",
      "excerpt": "Short excerpt from the blog post...",
      "author": {
        "id": "author-id",
        "name": "Author Name",
        "avatar": "/assets/authors/author.jpg"
      },
      "categories": ["category1", "category2"],
      "cover_image": "/assets/blog/cover-image.jpg",
      "published_at": "2024-01-15T10:00:00Z",
      "reading_time": 5
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "total_pages": 3
}
```

### Get Blog Post by Slug

Retrieves a single blog post by its slug.

**Endpoint:** `GET /api/blog/:slug`

**Path Parameters:**

| Parameter | Type   | Description     |
|-----------|--------|-----------------|
| `slug`    | string | Post slug       |

**Response:**

```json
{
  "post": {
    "id": "post-id",
    "title": "Blog Post Title",
    "slug": "blog-post-title",
    "content": "Full blog post content...",
    "author": {
      "id": "author-id",
      "name": "Author Name",
      "title": "Author Title",
      "avatar": "/assets/authors/author.jpg"
    },
    "categories": ["category1", "category2"],
    "cover_image": "/assets/blog/cover-image.jpg",
    "published_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z",
    "reading_time": 5
  },
  "related_posts": [
    {
      "id": "related-post-id",
      "title": "Related Post Title",
      "slug": "related-post-title",
      "excerpt": "Short excerpt from the related post...",
      "cover_image": "/assets/blog/related-cover-image.jpg",
      "published_at": "2024-01-20T10:00:00Z"
    }
  ]
}
```

## Checkout API

### Create Payment Intent

Creates a payment intent for checkout.

**Endpoint:** `POST /api/checkout/payment-intent`

**Request Body:**

```json
{
  "items": [
    {
      "product_id": "product-id",
      "quantity": 1,
      "custom_size": {
        "width": 60,
        "length": 102
      }
    }
  ],
  "shipping_address_id": "address-id",
  "billing_address_id": "address-id"
}
```

**Response:**

```json
{
  "clientSecret": "payment-intent-client-secret",
  "orderId": "order-id"
}
```

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs) - For payment processing details
- [Supabase Documentation](https://supabase.io/docs) - For database interaction
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - For API implementation details

## Version History

- v1.0.0 (2024-03-01) - Initial API release