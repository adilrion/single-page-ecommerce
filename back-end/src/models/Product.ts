import { IProduct } from "@types";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            maxlength: [100, "Product name cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"],
        },
        image: {
            type: String,
            required: [true, "Product image is required"],
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
            enum: [
                "electronics",
                "clothing",
                "books",
                "home",
                "sports",
                "beauty",
            ],
        },
        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock cannot be negative"],
            default: 0,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

// Indexes for better performance
productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ price: 1 });

export const Product = mongoose.model<IProduct>("Product", productSchema);
