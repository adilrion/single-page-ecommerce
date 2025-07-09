import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { toggleCart, totalItems } = useCart();
  const location = useLocation();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="text-xl font-light text-gray-900">Shop</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 font-light ${
                  location.pathname === '/' ? 'text-black' : 'text-gray-600'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="flex items-center space-x-2 relative font-light text-gray-600 hover:text-black"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;