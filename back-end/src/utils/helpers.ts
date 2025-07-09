import { NextFunction, Request, Response } from "express";

export const asyncHandler =
    (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };

export const generateUniqueId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
};

export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
};

export const isValidObjectId = (id: string): boolean => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
};
