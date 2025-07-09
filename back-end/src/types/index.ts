import { Document } from "mongoose";

// Product interfaces
export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    featured?: boolean;
}

// Cart interfaces
export interface ICartItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface ICart extends Document {
    _id: string;
    sessionId: string;
    items: ICartItem[];
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddToCartDto {
    productId: string;
    quantity: number;
}

export interface UpdateCartItemDto {
    quantity: number;
}

// Order interfaces
export interface ICustomerInfo {
    name: string;
    email: string;
    address: string;
}

export interface IOrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    totalPrice: number;
}

export interface IOrder extends Document {
    _id: string;
    orderNumber: string;
    customerInfo: ICustomerInfo;
    items: IOrderItem[];
    totalAmount: number;
    status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateOrderDto {
    customerInfo: ICustomerInfo;
    cartId: string;
}

// Frontend order interface
export interface CreateOrderFromFrontendDto {
    name: string;
    email: string;
    address: string;
    items: Array<{
        productId: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
}

// API Response interfaces
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface PaginationQuery {
    page?: string;
    limit?: string;
    sort?: string;
    category?: string;
    search?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
