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
    <Link to={`/product/${product._id}`} className="block">
      <div className="w-full max-w-[200px] mx-auto group">
        <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-sm">
          <div className="aspect-square bg-gray-50 overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <Button
              size="icon"
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white text-black shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Out of Stock</span>
              </div>
            )}
          </div>

          <div className="p-4 space-y-2">
            <h3 className="font-light text-sm text-gray-900 line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
            <p className="text-sm font-medium text-black">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>
            {product.featured && (
              <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;