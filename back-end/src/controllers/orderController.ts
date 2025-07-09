import { OrderService } from "@services/OrderService";
import { Request, Response } from "express";

const orderService = new OrderService();

export const createOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    const order = await orderService.createOrder(req.body);

    res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
    });
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);

    res.status(200).json({
        success: true,
        message: "Order retrieved successfully",
        data: order,
    });
};

export const getOrderByNumber = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { orderNumber } = req.params;
    const order = await orderService.getOrderByNumber(orderNumber);

    res.status(200).json({
        success: true,
        message: "Order retrieved successfully",
        data: order,
    });
};

export const getAllOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await orderService.getAllOrders(page, limit);

    res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        data: result.orders,
        pagination: result.pagination,
    });
};

export const updateOrderStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(id, status);

    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
    });
};

export const getOrdersByEmail = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email } = req.params;
    const orders = await orderService.getOrdersByEmail(email);

    res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        data: orders,
    });
};
