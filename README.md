# E-Commerce SPA Application

A modern, responsive e-commerce Single Page Application built with React/TypeScript frontend and Node.js/Express backend with MongoDB.

## 🎯 Project Overview

This project fulfills the requirements for a small e-commerce web application that displays products, allows users to add items to cart, and complete checkout without authentication. The application features a clean, modern design with industry-standard UI components.

## 🚀 Live Demo

-   **Frontend**: [[](https://ecommerce-frontend-eight-alpha.vercel.app/)]
-   **Backend**: [[](https://back-end-adilrion.vercel.app/)]

## 🛠 Tech Stack

### Frontend

-   **React 18** with TypeScript
-   **Vite** for development and building
-   **React Router DOM** for navigation
-   **Tailwind CSS** for styling
-   **Radix UI** components for accessible UI
-   **React Hook Form** with Zod validation
-   **Axios** for API communication
-   **Lucide React** for icons

### Backend

-   **Node.js** with TypeScript
-   **Express.js** framework
-   **MongoDB** with Mongoose ODM
-   **JWT** for potential authentication
-   **Helmet**, **CORS**, **Rate Limiting** for security
-   **Joi** for validation
-   **Morgan** for logging

## 📦 Features

### ✅ Required Features

-   [x] **Home Page**: Displays 8+ products with image, title, price, and "Add to Cart" button
-   [x] **Product Detail Page**: Full product information with description and add to cart functionality
-   [x] **Cart Sidebar**: Slide-in cart with quantity controls, total amount, and checkout button
-   [x] **Checkout Modal**: Form with name, email, and address fields for order placement
-   [x] **Responsive Design**: Works on desktop, tablet, and mobile
-   [x] **SPA Navigation**: Single page application with React Router
-   [x] **Search & Filter**: Product search and category filtering

### 🎁 Additional Features

-   [x] **Backend API**: Full REST API with product, cart, and order management
-   [x] **Database Integration**: MongoDB for data persistence
-   [x] **Stock Management**: Real-time stock tracking and out-of-stock indicators
-   [x] **Error Handling**: Comprehensive error handling and user feedback
-   [x] **Loading States**: Loading indicators for better UX
-   [x] **Order Management**: Order creation and tracking
-   [x] **Featured Products**: Special highlighting for featured items
-   [x] **Modern UI**: Clean, minimalist design with smooth animations

## 🏗 Project Structure

```
e-com/
├── back-end/
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript interfaces
│   │   ├── utils/          # Utility functions
│   │   └── scripts/        # Database seeding scripts
│   ├── package.json
│   └── .env
└── front-end/
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── context/        # React context providers
    │   ├── hooks/          # Custom hooks
    │   ├── services/       # API services
    │   ├── types/          # TypeScript interfaces
    │   └── lib/            # Utility functions
    ├── package.json
    └── .env
```

## 🚦 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   MongoDB (local installation or MongoDB Atlas)
-   npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone [your-repo-url]
    cd e-com
    ```

2. **Setup Backend**

    ```bash
    cd back-end
    npm install

    # Copy environment variables
    cp .env.example .env
    # Edit .env with your MongoDB connection string

    # Seed the database with sample products
    npm run seed

    # Start the development server
    npm run dev
    ```

3. **Setup Frontend**

    ```bash
    cd front-end
    npm install

    # Copy environment variables
    cp .env.example .env
    # Edit .env if needed (API URL is set to localhost:5000 by default)

    # Start the development server
    npm run dev
    ```

4. **Access the Application**
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:5000
    - API Documentation: http://localhost:5000/health

## 🔧 Environment Variables

### Backend (.env)

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

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Products

-   `GET /api/products` - Get all products
-   `GET /api/products/:id` - Get single product
-   `GET /api/products/featured` - Get featured products
-   `GET /api/products/search?q=term` - Search products
-   `GET /api/products/category/:category` - Get products by category

### Cart

-   `GET /api/cart` - Get or create cart
-   `POST /api/cart/add` - Add item to cart
-   `PUT /api/cart/item/:productId` - Update cart item quantity
-   `DELETE /api/cart/item/:productId` - Remove item from cart
-   `DELETE /api/cart` - Clear entire cart

### Orders

-   `POST /api/orders` - Create new order
-   `GET /api/orders/email/:email` - Get orders by email
-   `GET /api/orders/number/:orderNumber` - Get order by order number

## 🧪 Testing

### Backend

```bash
cd back-end
npm test
```

### Frontend

```bash
cd front-end
npm test
```

## 📦 Building for Production

### Backend

```bash
cd back-end
npm run build
npm start
```

### Frontend

```bash
cd front-end
npm run build
npm run preview
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Set environment variables in your hosting dashboard

### Backend Deployment (Railway/Render/Heroku)

1. Set up MongoDB Atlas or your preferred cloud database
2. Update environment variables in your hosting dashboard
3. Deploy from GitHub or using CLI tools

## 🎨 Design Features

-   **Clean & Modern**: Minimalist design with focus on products
-   **Responsive**: Mobile-first design that works on all devices
-   **Accessibility**: Built with Radix UI for keyboard navigation and screen readers
-   **Performance**: Optimized images, lazy loading, and efficient state management
-   **User Experience**: Smooth animations, loading states, and clear feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Your Name**

-   GitHub: [@your-username](https://github.com/adilrion)
-   LinkedIn: [your-profile](https://linkedin.com/in/adilrion)
-   Email: adilmahmoudrion@gmail.com

## 🙏 Acknowledgments

-   [Unsplash](https://unsplash.com) for product images
-   [Radix UI](https://radix-ui.com) for accessible components
-   [Tailwind CSS](https://tailwindcss.com) for styling utilities
-   [Lucide](https://lucide.dev) for beautiful icons
