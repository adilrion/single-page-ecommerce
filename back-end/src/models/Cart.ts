import mongoose, { Schema } from "mongoose";
import { ICart, ICartItem } from "../types";

const cartItemSchema = new Schema<ICartItem>(
    {
        productId: {
            type: String,
            required: true,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"],
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"],
        },
    },
    { _id: false }
);

const cartSchema = new Schema<ICart>(
    {
        sessionId: {
            type: String,
            required: [true, "Session ID is required"],
            unique: true,
        },
        items: {
            type: [cartItemSchema],
            default: [],
        },
        totalAmount: {
            type: Number,
            default: 0,
            min: [0, "Total amount cannot be negative"],
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc: any, ret: any) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

// Calculate total amount before saving
cartSchema.pre("save", function (next) {
    this.totalAmount = this.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    next();
});

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
