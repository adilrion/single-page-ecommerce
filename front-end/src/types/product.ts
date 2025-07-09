export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CheckoutForm {
    name: string;
    email: string;
    address: string;
}

// Backend cart types
export interface BackendCartItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface BackendCart {
    _id: string;
    sessionId: string;
    items: BackendCartItem[];
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}

// Order types
export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    _id: string;
    orderNumber: string;
    name: string;
    email: string;
    address: string;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}
