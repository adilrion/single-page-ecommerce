import { createError } from "@middleware/errorHandler";
import { Cart } from "@models/Cart";
import { Order } from "@models/Order";
import { Product } from "@models/Product";
import { CreateOrderDto, CreateOrderFromFrontendDto, IOrder } from "@types";

export class OrderService {
    async createOrder(orderData: CreateOrderDto): Promise<IOrder> {
        const { customerInfo, cartId } = orderData;

        // Get cart
        const cart = await Cart.findById(cartId);
        if (!cart || cart.items.length === 0) {
            throw createError("Cart not found or empty", 400);
        }

        // Verify all products exist and have sufficient stock
        const orderItems = [];
        let totalAmount = 0;

        for (const cartItem of cart.items) {
            const product = await Product.findById(cartItem.productId);

            if (!product) {
                throw createError(
                    `Product with ID ${cartItem.productId} not found`,
                    404
                );
            }

            if (product.stock < cartItem.quantity) {
                throw createError(
                    `Insufficient stock for product: ${product.name}`,
                    400
                );
            }

            const itemTotal = cartItem.price * cartItem.quantity;

            orderItems.push({
                productId: cartItem.productId,
                productName: product.name,
                quantity: cartItem.quantity,
                price: cartItem.price,
                totalPrice: itemTotal,
            });

            totalAmount += itemTotal;

            // Update product stock
            product.stock -= cartItem.quantity;
            await product.save();
        }

        // Create order
        const order = await Order.create({
            customerInfo,
            items: orderItems,
            totalAmount,
            status: "pending",
        });

        // Clear cart after successful order
        cart.items = [];
        await cart.save();

        return order.toJSON() as IOrder;
    }

    async createOrderFromFrontend(
        orderData: CreateOrderFromFrontendDto
    ): Promise<IOrder> {
        const { name, email, address, items, totalAmount } = orderData;

        // Verify all products exist and have sufficient stock
        const orderItems = [];
        let calculatedTotal = 0;

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                throw createError(
                    `Product with ID ${item.productId} not found`,
                    404
                );
            }

            if (product.stock < item.quantity) {
                throw createError(
                    `Insufficient stock for product: ${product.name}`,
                    400
                );
            }

            const itemTotal = item.price * item.quantity;

            orderItems.push({
                productId: item.productId,
                productName: product.name,
                quantity: item.quantity,
                price: item.price,
                totalPrice: itemTotal,
            });

            calculatedTotal += itemTotal;

            // Update product stock
            product.stock -= item.quantity;
            await product.save();
        }

        // Verify total amount
        if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
            throw createError("Total amount mismatch", 400);
        }

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)
            .toUpperCase()}`;

        // Create order
        const order = new Order({
            orderNumber,
            customerInfo: {
                name,
                email,
                address,
            },
            items: orderItems,
            totalAmount: calculatedTotal,
            status: "pending",
        });

        const savedOrder = await order.save();
        return savedOrder;
    }

    async getOrderById(orderId: string): Promise<IOrder> {
        const order = await Order.findById(orderId);

        if (!order) {
            throw createError("Order not found", 404);
        }

        return order.toJSON() as IOrder;
    }

    async getOrderByNumber(orderNumber: string): Promise<IOrder> {
        const order = await Order.findOne({ orderNumber });

        if (!order) {
            throw createError("Order not found", 404);
        }

        return order.toJSON() as IOrder;
    }

    async getAllOrders(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [orders, total] = await Promise.all([
            Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Order.countDocuments(),
        ]);

        const pages = Math.ceil(total / limit);

        return {
            orders,
            pagination: {
                page,
                limit,
                total,
                pages,
            },
        };
    }

    async updateOrderStatus(orderId: string, status: string): Promise<IOrder> {
        const validStatuses = [
            "pending",
            "confirmed",
            "shipped",
            "delivered",
            "cancelled",
        ];

        if (!validStatuses.includes(status)) {
            throw createError("Invalid order status", 400);
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            throw createError("Order not found", 404);
        }

        return order.toJSON() as IOrder;
    }

    async getOrdersByEmail(email: string): Promise<IOrder[]> {
        const orders = await Order.find({ "customerInfo.email": email })
            .sort({ createdAt: -1 })
            .lean();

        return orders as IOrder[];
    }
}
