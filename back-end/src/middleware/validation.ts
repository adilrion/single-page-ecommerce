import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateProduct = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const schema = Joi.object({
        name: Joi.string().required().trim().max(100),
        description: Joi.string().required().max(1000),
        price: Joi.number().required().min(0),
        image: Joi.string().required().uri(),
        category: Joi.string()
            .required()
            .valid(
                "electronics",
                "clothing",
                "books",
                "home",
                "sports",
                "beauty"
            ),
        stock: Joi.number().required().min(0),
        featured: Joi.boolean().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
        return;
    }

    next();
};

export const validateCart = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const schema = Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required().min(1),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
        return;
    }

    next();
};

export const validateOrder = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const schema = Joi.object({
        customerInfo: Joi.object({
            name: Joi.string().required().trim(),
            email: Joi.string().required().email(),
            address: Joi.string().required().trim(),
        }).required(),
        cartId: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
        return;
    }

    next();
};
