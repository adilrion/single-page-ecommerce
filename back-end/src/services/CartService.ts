import { v4 as uuidv4 } from "uuid";
import { createError } from "../middleware/errorHandler";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { AddToCartDto, ICart, UpdateCartItemDto } from "../types";

export class CartService {
    async getOrCreateCart(sessionId: string): Promise<ICart> {
        let cart = await Cart.findOne({ sessionId });

        if (!cart) {
            cart = await Cart.create({
                sessionId,
                items: [],
                totalAmount: 0,
            });
        }

        return cart.toJSON() as ICart;
    }

    async addToCart(
        sessionId: string,
        addToCartData: AddToCartDto
    ): Promise<ICart> {
        const { productId, quantity } = addToCartData;

        // Verify product exists
        const product = await Product.findById(productId);
        if (!product) {
            throw createError("Product not found", 404);
        }

        // Check stock availability
        if (product.stock < quantity) {
            throw createError("Insufficient stock available", 400);
        }

        let cart = await Cart.findOne({ sessionId });

        if (!cart) {
            cart = new Cart({
                sessionId,
                items: [
                    {
                        productId,
                        quantity,
                        price: product.price,
                    },
                ],
            });
        } else {
            const existingItemIndex = cart.items.findIndex(
                (item) => item.productId === productId
            );

            if (existingItemIndex >= 0) {
                // Update existing item
                const newQuantity =
                    cart.items[existingItemIndex].quantity + quantity;

                if (product.stock < newQuantity) {
                    throw createError("Insufficient stock available", 400);
                }

                cart.items[existingItemIndex].quantity = newQuantity;
            } else {
                // Add new item
                cart.items.push({
                    productId,
                    quantity,
                    price: product.price,
                });
            }
        }

        await cart.save();
        return cart.toJSON() as ICart;
    }

    async updateCartItem(
        sessionId: string,
        productId: string,
        updateData: UpdateCartItemDto
    ): Promise<ICart> {
        const cart = await Cart.findOne({ sessionId });

        if (!cart) {
            throw createError("Cart not found", 404);
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId === productId
        );

        if (itemIndex === -1) {
            throw createError("Item not found in cart", 404);
        }

        // Verify product exists and check stock
        const product = await Product.findById(productId);
        if (!product) {
            throw createError("Product not found", 404);
        }

        if (product.stock < updateData.quantity) {
            throw createError("Insufficient stock available", 400);
        }

        cart.items[itemIndex].quantity = updateData.quantity;
        await cart.save();

        return cart.toJSON() as ICart;
    }

    async removeFromCart(sessionId: string, productId: string): Promise<ICart> {
        const cart = await Cart.findOne({ sessionId });

        if (!cart) {
            throw createError("Cart not found", 404);
        }

        cart.items = cart.items.filter((item) => item.productId !== productId);
        await cart.save();

        return cart.toJSON() as ICart;
    }

    async clearCart(sessionId: string): Promise<ICart> {
        const cart = await Cart.findOne({ sessionId });

        if (!cart) {
            throw createError("Cart not found", 404);
        }

        cart.items = [];
        await cart.save();

        return cart.toJSON() as ICart;
    }

    async getCartById(cartId: string): Promise<ICart> {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw createError("Cart not found", 404);
        }

        return cart.toJSON() as ICart;
    }

    generateSessionId(): string {
        return uuidv4();
    }
}
