import { createError } from "@middleware/errorHandler";
import { Product } from "@models/Product";
import { CreateProductDto, IProduct, PaginationQuery } from "@types";

export class ProductService {
    async getAllProducts(query: PaginationQuery) {
        const page = parseInt(query.page || "1", 10);
        const limit = parseInt(query.limit || "10", 10);
        const skip = (page - 1) * limit;

        // Build filter object
        const filter: any = {};

        if (query.category) {
            filter.category = query.category;
        }

        if (query.search) {
            filter.$text = { $search: query.search };
        }

        // Build sort object
        let sort: any = { createdAt: -1 };
        if (query.sort) {
            const sortField = query.sort.startsWith("-")
                ? query.sort.slice(1)
                : query.sort;
            const sortOrder = query.sort.startsWith("-") ? -1 : 1;
            sort = { [sortField]: sortOrder };
        }

        const [products, total] = await Promise.all([
            Product.find(filter).sort(sort).skip(skip).limit(limit).lean(),
            Product.countDocuments(filter),
        ]);

        const pages = Math.ceil(total / limit);

        return {
            products,
            pagination: {
                page,
                limit,
                total,
                pages,
            },
        };
    }

    async getProductById(id: string): Promise<IProduct> {
        const product = await Product.findById(id).lean();
        if (!product) {
            throw createError("Product not found", 404);
        }
        return product as IProduct;
    }

    async getFeaturedProducts(): Promise<IProduct[]> {
        return (await Product.find({ featured: true })
            .limit(6)
            .lean()) as IProduct[];
    }

    async createProduct(productData: CreateProductDto): Promise<IProduct> {
        const product = await Product.create(productData);
        return product.toJSON() as IProduct;
    }

    async updateProduct(
        id: string,
        productData: Partial<CreateProductDto>
    ): Promise<IProduct> {
        const product = await Product.findByIdAndUpdate(id, productData, {
            new: true,
            runValidators: true,
        }).lean();

        if (!product) {
            throw createError("Product not found", 404);
        }

        return product as IProduct;
    }

    async deleteProduct(id: string): Promise<void> {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw createError("Product not found", 404);
        }
    }

    async getProductsByCategory(category: string): Promise<IProduct[]> {
        return (await Product.find({ category }).lean()) as IProduct[];
    }

    async searchProducts(searchTerm: string): Promise<IProduct[]> {
        return (await Product.find({
            $text: { $search: searchTerm },
        }).lean()) as IProduct[];
    }
}
