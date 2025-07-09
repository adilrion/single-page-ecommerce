import {
    createOrder,
    getAllOrders,
    getOrder,
    getOrderByNumber,
    getOrdersByEmail,
    updateOrderStatus,
} from "@controllers/orderController";
import { validateOrder } from "@middleware/validation";
import { Router } from "express";

const router = Router();

// POST /api/orders - Create new order
router.post("/", validateOrder, createOrder);

// GET /api/orders - Get all orders (admin)
router.get("/", getAllOrders);

// GET /api/orders/email/:email - Get orders by email
router.get("/email/:email", getOrdersByEmail);

// GET /api/orders/number/:orderNumber - Get order by order number
router.get("/number/:orderNumber", getOrderByNumber);

// GET /api/orders/:id - Get single order
router.get("/:id", getOrder);

// PATCH /api/orders/:id/status - Update order status
router.patch("/:id/status", updateOrderStatus);

export default router;
