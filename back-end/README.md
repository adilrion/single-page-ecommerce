# E-Commerce Backend API

A robust, scalable Node.js backend API for an e-commerce single page application built with TypeScript, Express.js, and MongoDB.

## 🚀 Features

-   **RESTful API**: Well-structured endpoints for products, cart, and orders
-   **TypeScript**: Full type safety and better developer experience
-   **MongoDB**: NoSQL database with Mongoose ODM
-   **Modular Architecture**: Clean, maintainable, and scalable code structure
-   **Input Validation**: Joi validation for request data
-   **Error Handling**: Centralized error handling middleware
-   **CORS Support**: Cross-origin resource sharing enabled
-   **Rate Limiting**: API rate limiting for security
-   **Session-based Cart**: Stateless cart management using session IDs
-   **Product Management**: CRUD operations with search and filtering
-   **Order Processing**: Complete order workflow with stock management

## 🛠 Tech Stack

-   **Node.js** - Runtime environment
-   **TypeScript** - Programming language
-   **Express.js** - Web framework
-   **MongoDB** - Database
-   **Mongoose** - ODM for MongoDB
-   **Joi** - Data validation
-   **Helmet** - Security middleware
-   **CORS** - Cross-origin resource sharing
-   **Morgan** - HTTP request logger
-   **Compression** - Response compression

## 📁 Project Structure

```
src/
├── config/
│   ├── config.ts          # Application configuration
│   └── database.ts        # Database connection
├── controllers/
│   ├── productController.ts
│   ├── cartController.ts
│   └── orderController.ts
├── middleware/
│   ├── errorHandler.ts    # Error handling middleware
│   ├── notFound.ts        # 404 handler
│   └── validation.ts      # Input validation
├── models/
│   ├── Product.ts         # Product model
│   ├── Cart.ts           # Cart model
│   └── Order.ts          # Order model
├── routes/
│   ├── productRoutes.ts
│   ├── cartRoutes.ts
│   └── orderRoutes.ts
├── services/
│   ├── ProductService.ts
│   ├── CartService.ts
│   └── OrderService.ts
├── types/
│   └── index.ts          # TypeScript interfaces
├── utils/
│   └── helpers.ts        # Utility functions
├── scripts/
│   └── seed.ts           # Database seeding
└── index.ts              # Application entry point
```

## 🚦 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   MongoDB (local or cloud instance)
-   npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd ecommerce-backend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Setup**

    ```bash
    cp .env.example .env
    ```

    Update the `.env` file with your configuration:

    ```env
    NODE_ENV=development
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/ecommerce_db
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRES_IN=7d
    ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
    RATE_LIMIT_WINDOW_MS=900000
    RATE_LIMIT_MAX_REQUESTS=100
    ```

4. **Start MongoDB**

    Make sure MongoDB is running on your system.

5. **Seed the database** (optional)

    ```bash
    npm run seed
    ```

6. **Build and start the server**

    ```bash
    # Development
    npm run dev

    # Production
    npm run build
    npm start
    ```

## 📊 API Endpoints

### Products

-   `GET /api/products` - Get all products with pagination and filtering
-   `GET /api/products/featured` - Get featured products
-   `GET /api/products/search?q=query` - Search products
-   `GET /api/products/category/:category` - Get products by category
-   `GET /api/products/:id` - Get single product
-   `POST /api/products` - Create new product
-   `PUT /api/products/:id` - Update product
-   `DELETE /api/products/:id` - Delete product

### Cart

-   `GET /api/cart` - Get or create cart
-   `POST /api/cart/add` - Add item to cart
-   `PUT /api/cart/item/:productId` - Update cart item quantity
-   `DELETE /api/cart/item/:productId` - Remove item from cart
-   `DELETE /api/cart` - Clear entire cart

### Orders

-   `POST /api/orders` - Create new order
-   `GET /api/orders` - Get all orders
-   `GET /api/orders/:id` - Get single order
-   `GET /api/orders/number/:orderNumber` - Get order by order number
-   `GET /api/orders/email/:email` - Get orders by customer email
-   `PATCH /api/orders/:id/status` - Update order status

## 🔧 API Usage Examples

### Get Products with Filtering

```bash
GET /api/products?page=1&limit=10&category=electronics&sort=price
```

### Add Item to Cart

```bash
POST /api/cart/add
Headers: {
  "Content-Type": "application/json",
  "x-session-id": "your-session-id"
}
Body: {
  "productId": "product_id_here",
  "quantity": 2
}
```

### Create Order

```bash
POST /api/orders
Body: {
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, Country"
  },
  "cartId": "cart_id_here"
}
```

## 🔒 Security Features

-   **Helmet**: Security headers
-   **CORS**: Cross-origin resource sharing
-   **Rate Limiting**: Prevents abuse
-   **Input Validation**: Joi validation
-   **Error Handling**: Secure error responses

## 📱 Frontend Integration

This backend is designed to work with React frontends. Key integration points:

1. **Session Management**: Use `x-session-id` header for cart operations
2. **Error Handling**: All responses follow consistent format
3. **Pagination**: Built-in pagination for large datasets
4. **Search & Filter**: Powerful search and filtering capabilities

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce_db
JWT_SECRET=your_super_secure_production_secret
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Build for Production

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please open an issue on GitHub.
