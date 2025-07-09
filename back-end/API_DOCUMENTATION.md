# E-Commerce API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

This API uses session-based cart management. Include the `x-session-id` header for cart operations.

## Response Format

All API responses follow this structure:

```json
{
  "success": boolean,
  "message": string,
  "data": any,        // Optional
  "pagination": {}    // Optional for paginated responses
}
```

## Error Handling

Error responses:

```json
{
    "success": false,
    "message": "Error description"
}
```

Common HTTP status codes:

-   `200` - Success
-   `201` - Created
-   `400` - Bad Request
-   `404` - Not Found
-   `500` - Internal Server Error

---

## Products API

### Get All Products

```http
GET /products?page=1&limit=10&category=electronics&sort=price&search=phone
```

**Query Parameters:**

-   `page` (optional): Page number (default: 1)
-   `limit` (optional): Items per page (default: 10)
-   `category` (optional): Filter by category
-   `sort` (optional): Sort field (prefix with `-` for descending)
-   `search` (optional): Search term

**Response:**

```json
{
    "success": true,
    "message": "Products retrieved successfully",
    "data": [
        {
            "id": "product_id",
            "name": "Product Name",
            "description": "Product description",
            "price": 99.99,
            "image": "https://example.com/image.jpg",
            "category": "electronics",
            "stock": 50,
            "featured": true,
            "createdAt": "2023-01-01T00:00:00.000Z",
            "updatedAt": "2023-01-01T00:00:00.000Z"
        }
    ],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 100,
        "pages": 10
    }
}
```

### Get Single Product

```http
GET /products/:id
```

### Get Featured Products

```http
GET /products/featured
```

### Get Products by Category

```http
GET /products/category/:category
```

### Search Products

```http
GET /products/search?q=search_term
```

### Create Product

```http
POST /products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "electronics",
  "stock": 50,
  "featured": false
}
```

### Update Product

```http
PUT /products/:id
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 89.99
}
```

### Delete Product

```http
DELETE /products/:id
```

---

## Cart API

### Get Cart

```http
GET /cart
x-session-id: your-session-id
```

**Response:**

```json
{
    "success": true,
    "message": "Cart retrieved successfully",
    "data": {
        "id": "cart_id",
        "sessionId": "session_id",
        "items": [
            {
                "productId": "product_id",
                "quantity": 2,
                "price": 99.99
            }
        ],
        "totalAmount": 199.98,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    "sessionId": "session_id"
}
```

### Add to Cart

```http
POST /cart/add
Content-Type: application/json
x-session-id: your-session-id

{
  "productId": "product_id",
  "quantity": 2
}
```

### Update Cart Item

```http
PUT /cart/item/:productId
Content-Type: application/json
x-session-id: your-session-id

{
  "quantity": 3
}
```

### Remove from Cart

```http
DELETE /cart/item/:productId
x-session-id: your-session-id
```

### Clear Cart

```http
DELETE /cart
x-session-id: your-session-id
```

---

## Orders API

### Create Order

```http
POST /orders
Content-Type: application/json

{
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, Country"
  },
  "cartId": "cart_id"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Order created successfully",
    "data": {
        "id": "order_id",
        "orderNumber": "ORD-ABC123",
        "customerInfo": {
            "name": "John Doe",
            "email": "john@example.com",
            "address": "123 Main St, City, Country"
        },
        "items": [
            {
                "productId": "product_id",
                "productName": "Product Name",
                "quantity": 2,
                "price": 99.99,
                "totalPrice": 199.98
            }
        ],
        "totalAmount": 199.98,
        "status": "pending",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
    }
}
```

### Get Order

```http
GET /orders/:id
```

### Get Order by Number

```http
GET /orders/number/:orderNumber
```

### Get All Orders

```http
GET /orders?page=1&limit=10
```

### Get Orders by Email

```http
GET /orders/email/:email
```

### Update Order Status

```http
PATCH /orders/:id/status
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Valid statuses:** `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

---

## Categories

Available product categories:

-   `electronics`
-   `clothing`
-   `books`
-   `home`
-   `sports`
-   `beauty`

---

## Rate Limiting

-   Window: 15 minutes
-   Max requests: 100 per IP
-   Headers included: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
