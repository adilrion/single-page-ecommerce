import dotenv from "dotenv";

dotenv.config();

interface Config {
    nodeEnv: string;
    port: number;
    mongodbUri: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    allowedOrigins: string[];
    rateLimitWindowMs: number;
    rateLimitMaxRequests: number;
}

const config: Config = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "5000", 10),
    mongodbUri:
        process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce_db",
    jwtSecret: process.env.JWT_SECRET || "your_super_secret_jwt_key",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [
        "http://localhost:3000",
    ],
    rateLimitWindowMs: parseInt(
        process.env.RATE_LIMIT_WINDOW_MS || "900000",
        10
    ),
    rateLimitMaxRequests: parseInt(
        process.env.RATE_LIMIT_MAX_REQUESTS || "100",
        10
    ),
};

export default config;
