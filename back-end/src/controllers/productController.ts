import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { PaginationQuery } from "../types";

const productService = new ProductService();

export const getProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    const query = req.query as PaginationQuery;
    const result = await productService.getAllProducts(query);

    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: result.products,
        pagination: result.pagination,
    });
};

export const getProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: product,
    });
};

export const getFeaturedProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    const products = await productService.getFeaturedProducts();

    res.status(200).json({
        success: true,
        message: "Featured products retrieved successfully",
        data: products,
    });
};

export const createProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    });
};

export const updateProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
};

export const deleteProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    await productService.deleteProduct(id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
};

export const getProductsByCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { category } = req.params;
    const products = await productService.getProductsByCategory(category);

    res.status(200).json({
        success: true,
        message: `Products in category '${category}' retrieved successfully`,
        data: products,
    });
};

export const searchProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
        res.status(400).json({
            success: false,
            message: "Search query is required",
        });
        return;
    }

    const products = await productService.searchProducts(q);

    res.status(200).json({
        success: true,
        message: "Search completed successfully",
        data: products,
    });
};
