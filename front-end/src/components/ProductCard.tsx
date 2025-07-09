import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link to={`/product/${product._id}`} className="block group">
      <div className="w-full">
        {/* Image Container */}
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Add to Cart Button */}
          <Button
            size="icon"
            className="absolute top-3 right-3 w-8 h-8 bg-white/95 hover:bg-white text-gray-900 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-full border-0"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <Plus className="h-4 w-4" />
          </Button>

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-5">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 capitalize">
            {product.category}
          </p>
          <p className="text-sm font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;