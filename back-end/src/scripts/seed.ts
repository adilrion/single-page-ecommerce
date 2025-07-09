import mongoose from "mongoose";
import config from "../config/config";
import { Product } from "../models/Product";

const sampleProducts = [
    {
        name: "Wireless Bluetooth Headphones",
        description:
            "High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        category: "electronics",
        stock: 50,
        featured: true,
    },
    {
        name: "Smartphone Pro Max",
        description:
            "Latest smartphone with advanced camera system, powerful processor, and all-day battery life.",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        category: "electronics",
        stock: 30,
        featured: true,
    },
    {
        name: "Cozy Cotton T-Shirt",
        description:
            "Comfortable 100% cotton t-shirt available in multiple colors. Perfect for casual wear.",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        category: "clothing",
        stock: 100,
        featured: false,
    },
    {
        name: "JavaScript: The Definitive Guide",
        description:
            "Comprehensive guide to JavaScript programming. Essential for web developers.",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
        category: "books",
        stock: 25,
        featured: true,
    },
    {
        name: "Ergonomic Office Chair",
        description:
            "Comfortable office chair with lumbar support and adjustable height. Great for long work sessions.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        category: "home",
        stock: 15,
        featured: false,
    },
    {
        name: "Yoga Mat Premium",
        description:
            "Non-slip yoga mat with extra cushioning. Perfect for yoga, pilates, and other exercises.",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
        category: "sports",
        stock: 40,
        featured: true,
    },
    {
        name: "Organic Face Moisturizer",
        description:
            "Natural organic moisturizer for all skin types. Hydrates and nourishes your skin.",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
        category: "beauty",
        stock: 60,
        featured: false,
    },
    {
        name: "Laptop Stand Adjustable",
        description:
            "Adjustable aluminum laptop stand for better ergonomics and cooling.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        category: "electronics",
        stock: 35,
        featured: true,
    },
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.mongodbUri);
        console.log("Connected to MongoDB");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");

        // Insert sample products
        const products = await Product.insertMany(sampleProducts);
        console.log(`Inserted ${products.length} sample products`);

        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();
