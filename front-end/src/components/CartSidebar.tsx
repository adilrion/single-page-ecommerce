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
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={closeCart} />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Cart ({state.items.length})
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            className="h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-sm">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.product._id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      ${item.product.price.toFixed(2)} each
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-gray-200 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-gray-200 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Section */}
        {state.items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center py-2">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-4 text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Checkout • ${totalPrice.toFixed(2)}
              </Button>

              {/* Additional Info */}
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Free shipping on orders over $50 • Secure checkout
              </p>
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