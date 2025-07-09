import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Product API functions
export const productAPI = {
    // Get all products
    getProducts: async () => {
        const response = await api.get("/products");
        return response.data.data;
    },

    // Get single product by ID
    getProduct: async (id: string) => {
        const response = await api.get(`/products/${id}`);
        return response.data.data;
    },

    // Get featured products
    getFeaturedProducts: async () => {
        const response = await api.get("/products/featured");
        return response.data.data;
    },

    // Search products
    searchProducts: async (query: string) => {
        const response = await api.get(`/products/search?q=${query}`);
        return response.data.data;
    },

    // Get products by category
    getProductsByCategory: async (category: string) => {
        const response = await api.get(`/products/category/${category}`);
        return response.data.data;
    },
};

// Cart API functions
export const cartAPI = {
    // Get cart
    getCart: async () => {
        const response = await api.get("/cart");
        return response.data.data;
    },

    // Add item to cart
    addToCart: async (productId: string, quantity: number = 1) => {
        const response = await api.post("/cart/add", { productId, quantity });
        return response.data.data;
    },

    // Update cart item quantity
    updateCartItem: async (productId: string, quantity: number) => {
        const response = await api.put(`/cart/item/${productId}`, { quantity });
        return response.data.data;
    },

    // Remove item from cart
    removeFromCart: async (productId: string) => {
        const response = await api.delete(`/cart/item/${productId}`);
        return response.data.data;
    },

    // Clear cart
    clearCart: async () => {
        const response = await api.delete("/cart");
        return response.data.data;
    },
};

// Order API functions
export const orderAPI = {
    // Create order
    createOrder: async (orderData: {
        name: string;
        email: string;
        address: string;
        items: Array<{ productId: string; quantity: number; price: number }>;
        totalAmount: number;
    }) => {
        const response = await api.post("/orders", orderData);
        return response.data.data;
    },

    // Get order by order number
    getOrderByNumber: async (orderNumber: string) => {
        const response = await api.get(`/orders/number/${orderNumber}`);
        return response.data.data;
    },

    // Get orders by email
    getOrdersByEmail: async (email: string) => {
        const response = await api.get(`/orders/email/${email}`);
        return response.data.data;
    },
};

export default api;
