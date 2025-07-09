# Production Deployment Guide

## Prerequisites

1. **Node.js 16+** installed on server
2. **MongoDB** database (local or cloud)
3. **PM2** for process management (optional but recommended)
4. **Nginx** for reverse proxy (optional)

## Environment Setup

1. **Clone and Install**

    ```bash
    git clone <your-repo-url>
    cd ecommerce-backend
    npm install
    ```

2. **Environment Configuration**

    ```bash
    cp .env.example .env
    ```

    Update `.env` with production values:

    ```env
    NODE_ENV=production
    PORT=5000
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce_db
    JWT_SECRET=your_super_secure_production_secret_key
    ALLOWED_ORIGINS=https://your-frontend-domain.com
    RATE_LIMIT_WINDOW_MS=900000
    RATE_LIMIT_MAX_REQUESTS=100
    ```

3. **Build Application**
    ```bash
    npm run build
    ```

## Deployment Options

### Option 1: Direct Node.js

```bash
# Start application
npm start

# Or with PM2 (recommended)
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Nginx Configuration (Optional)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## PM2 Ecosystem Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
    apps: [
        {
            name: "ecommerce-backend",
            script: "dist/index.js",
            instances: "max",
            exec_mode: "cluster",
            env: {
                NODE_ENV: "production",
                PORT: 5000,
            },
            error_file: "./logs/err.log",
            out_file: "./logs/out.log",
            log_file: "./logs/combined.log",
            time: true,
        },
    ],
};
```

## Health Checks

Monitor your application:

```bash
# Health check endpoint
curl http://your-domain.com/health

# PM2 status
pm2 status
```

## Security Checklist

-   [ ] Use HTTPS in production
-   [ ] Set strong JWT secret
-   [ ] Configure CORS properly
-   [ ] Use environment variables for secrets
-   [ ] Enable rate limiting
-   [ ] Keep dependencies updated
-   [ ] Use reverse proxy (Nginx)
-   [ ] Monitor application logs

## Monitoring

Consider setting up:

-   **Application monitoring**: PM2 monitoring, New Relic, or DataDog
-   **Database monitoring**: MongoDB Atlas monitoring
-   **Error tracking**: Sentry
-   **Uptime monitoring**: Pingdom, UptimeRobot

## Scaling

For high traffic:

1. Use PM2 cluster mode
2. Set up load balancer
3. Use Redis for session storage
4. Implement database indexing
5. Use CDN for static assets
6. Consider microservices architecture
