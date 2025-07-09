# E-Commerce Application Deployment Guide

## Quick Start Scripts

### Development Setup

```bash
# Start both servers simultaneously
npm run dev:all
```

### Backend Only

```bash
cd back-end
npm install
npm run seed
npm run dev
```

### Frontend Only

```bash
cd front-end
npm install
npm run dev
```

## Production Deployment

### Frontend (Netlify/Vercel)

1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set environment variables:
    - `VITE_API_BASE_URL=https://your-backend-url.com/api`

### Backend (Railway/Render/Heroku)

1. Set environment variables:
    - `NODE_ENV=production`
    - `MONGODB_URI=your-mongodb-atlas-url`
    - `ALLOWED_ORIGINS=https://your-frontend-url.com`
2. Deploy from GitHub
3. Run: `npm run seed` (one time)

## Environment Variables

### Backend (.env)

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
JWT_SECRET=your_production_secret_key
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Frontend (.env)

```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```
