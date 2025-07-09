import { NextFunction, Request, Response } from "express";

export interface ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
}

export const errorHandler = (
    err: ApiError | Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let error = { ...err } as ApiError;
    error.message = err.message;

    // Log error
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = "Resource not found";
        error = createError(message, 404);
    }

    // Mongoose duplicate key
    if ((err as any).code === 11000) {
        const message = "Duplicate field value entered";
        error = createError(message, 400);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values((err as any).errors)
            .map((val: any) => val.message)
            .join(", ");
        error = createError(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

const createError = (message: string, statusCode: number): ApiError => {
    const error = new Error(message) as ApiError;
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};

export { createError };
