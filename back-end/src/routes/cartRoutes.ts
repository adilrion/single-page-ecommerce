import {
    addToCart,
    clearCart,
    getCart,
    removeFromCart,
    updateCartItem,
} from "@controllers/cartController";
import { validateCart } from "@middleware/validation";
import { Router } from "express";

const router = Router();

// GET /api/cart - Get or create cart
router.get("/", getCart);

// POST /api/cart/add - Add item to cart
router.post("/add", validateCart, addToCart);

// PUT /api/cart/item/:productId - Update cart item quantity
router.put("/item/:productId", updateCartItem);

// DELETE /api/cart/item/:productId - Remove item from cart
router.delete("/item/:productId", removeFromCart);

// DELETE /api/cart - Clear entire cart
router.delete("/", clearCart);

export default router;
