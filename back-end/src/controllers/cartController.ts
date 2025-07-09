import { Request, Response } from "express";
import { CartService } from "../services/CartService";

const cartService = new CartService();

export const getCart = async (req: Request, res: Response): Promise<void> => {
    let sessionId = req.headers["x-session-id"] as string;

    if (!sessionId) {
        sessionId = cartService.generateSessionId();
    }

    const cart = await cartService.getOrCreateCart(sessionId);

    res.status(200).json({
        success: true,
        message: "Cart retrieved successfully",
        data: cart,
        sessionId,
    });
};

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    let sessionId = req.headers["x-session-id"] as string;

    if (!sessionId) {
        sessionId = cartService.generateSessionId();
    }

    const cart = await cartService.addToCart(sessionId, req.body);

    res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        data: cart,
        sessionId,
    });
};

export const updateCartItem = async (
    req: Request,
    res: Response
): Promise<void> => {
    const sessionId = req.headers["x-session-id"] as string;
    const { productId } = req.params;

    if (!sessionId) {
        res.status(400).json({
            success: false,
            message: "Session ID is required",
        });
        return;
    }

    const cart = await cartService.updateCartItem(
        sessionId,
        productId,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Cart item updated successfully",
        data: cart,
    });
};

export const removeFromCart = async (
    req: Request,
    res: Response
): Promise<void> => {
    const sessionId = req.headers["x-session-id"] as string;
    const { productId } = req.params;

    if (!sessionId) {
        res.status(400).json({
            success: false,
            message: "Session ID is required",
        });
        return;
    }

    const cart = await cartService.removeFromCart(sessionId, productId);

    res.status(200).json({
        success: true,
        message: "Product removed from cart successfully",
        data: cart,
    });
};

export const clearCart = async (req: Request, res: Response): Promise<void> => {
    const sessionId = req.headers["x-session-id"] as string;

    if (!sessionId) {
        res.status(400).json({
            success: false,
            message: "Session ID is required",
        });
        return;
    }

    const cart = await cartService.clearCart(sessionId);

    res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
        data: cart,
    });
};
