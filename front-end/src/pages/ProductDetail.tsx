import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProduct } from '../hooks/useProducts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { product, loading, error } = useProduct(id || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Error loading product</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 font-light text-gray-600 hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                {product.category}
              </p>
              <h1 className="text-3xl font-light mb-6 text-gray-900">{product.name}</h1>
              <p className="text-2xl font-medium text-black mb-8">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed font-light">{product.description}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-light text-sm ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-light">
                Free shipping on orders over $50
              </p>
            </div>

            <div className="space-y-6">
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-3 flex items-center justify-center space-x-2 font-light disabled:bg-gray-400"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <Plus className="h-4 w-4" />
                <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
              </Button>

              <div className="text-center text-sm text-gray-500 font-light">
                <p>30-day returns • Free shipping • Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;