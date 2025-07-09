import { ICustomerInfo, IOrder, IOrderItem } from "@types";
import mongoose, { Schema } from "mongoose";

const customerInfoSchema = new Schema<ICustomerInfo>(
    {
        name: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Customer email is required"],
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },
        address: {
            type: String,
            required: [true, "Customer address is required"],
            trim: true,
        },
    },
    { _id: false }
);

const orderItemSchema = new Schema<IOrderItem>(
    {
        productId: {
            type: String,
            required: true,
            ref: "Product",
        },
        productName: {
            type: String,
            required: true,
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
        totalPrice: {
            type: Number,
            required: true,
            min: [0, "Total price cannot be negative"],
        },
    },
    { _id: false }
);

const orderSchema = new Schema<IOrder>(
    {
        orderNumber: {
            type: String,
            unique: true,
        },
        customerInfo: {
            type: customerInfoSchema,
            required: true,
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: function (items: IOrderItem[]) {
                    return items.length > 0;
                },
                message: "Order must contain at least one item",
            },
        },
        totalAmount: {
            type: Number,
            required: true,
            min: [0, "Total amount cannot be negative"],
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            default: "pending",
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

// Generate order number before saving
orderSchema.pre("save", function (next: any) {
    if (this.isNew && !this.orderNumber) {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        this.orderNumber = `ORD-${timestamp}-${random}`.toUpperCase();
    }
    next();
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
