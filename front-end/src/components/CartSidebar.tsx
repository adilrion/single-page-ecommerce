import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import React from 'react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

const CartSidebar: React.FC = () => {
  const { state, closeCart, updateQuantity, totalPrice } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  if (!state.isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-20 z-50" onClick={closeCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-light">Cart</h2>
            <Button variant="ghost" size="icon" onClick={closeCart} className="hover:bg-gray-50">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag className="h-12 w-12 mb-4" />
              <p className="font-light">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {state.items.map((item) => (
                <div key={item.product._id} className="group">
                  <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-light text-sm text-gray-900 line-clamp-1 mb-1">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-black">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-gray-100 rounded-full"
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm font-light">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-gray-100 rounded-full"
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-light text-gray-600">Total</span>
                <span className="font-medium text-lg text-black">${totalPrice.toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white rounded-full font-light"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};

export default CartSidebar;