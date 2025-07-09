import mongoose from "mongoose";
import config from "./config";

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(config.mongodbUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

// Graceful shutdown
process.on("SIGINT", async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Error during graceful shutdown:", error);
        process.exit(1);
    }
});
