import {
    createProduct,
    deleteProduct,
    getFeaturedProducts,
    getProduct,
    getProducts,
    getProductsByCategory,
    searchProducts,
    updateProduct,
} from "@controllers/productController";
import { validateProduct } from "@middleware/validation";
import { Router } from "express";

const router = Router();

// GET /api/products - Get all products with pagination and filtering
router.get("/", getProducts);

// GET /api/products/featured - Get featured products
router.get("/featured", getFeaturedProducts);

// GET /api/products/search - Search products
router.get("/search", searchProducts);

// GET /api/products/category/:category - Get products by category
router.get("/category/:category", getProductsByCategory);

// GET /api/products/:id - Get single product
router.get("/:id", getProduct);

// POST /api/products - Create new product
router.post("/", validateProduct, createProduct);

// PUT /api/products/:id - Update product
router.put("/:id", validateProduct, updateProduct);

// DELETE /api/products/:id - Delete product
router.delete("/:id", deleteProduct);

export default router;
