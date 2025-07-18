import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { state, clearCart, totalPrice } = useCart();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus the first input field when modal opens
      setTimeout(() => setFocus('name'), 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isSubmitting, onClose, setFocus]);

  const onSubmit = async (data: CheckoutForm) => {
    try {
      setIsSubmitting(true);
      setError('');

      // Prepare order data
      const orderData = {
        name: data.name,
        email: data.email,
        address: data.address,
        items: state.items.map(item => ({
          productId: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: totalPrice
      };

      // Submit order to backend
      const order = await orderAPI.createOrder(orderData);
      setOrderNumber(order.orderNumber);
      setIsSubmitted(true);
      clearCart();

      // Reset form and close modal after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setOrderNumber('');
        reset();
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err instanceof Error ? err.message : 'Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isSubmitting ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white rounded-t-2xl flex-shrink-0">
          <h2 id="checkout-modal-title" className="text-xl font-semibold text-gray-900">
            {isSubmitted ? 'Order Confirmed!' : 'Complete Your Order'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10 rounded-full hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Close modal"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Thank you for your order!</h3>
              <p className="text-base text-gray-600 mb-4">
                Order #{orderNumber}
              </p>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                ${totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-6">
                You will receive a confirmation email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-800 mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    {...register('name')}
                    className="w-full border-gray-300 rounded-xl focus:border-gray-900 focus:ring-0 transition-all h-12 text-base"
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-2">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-800 mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full border-gray-300 rounded-xl focus:border-gray-900 focus:ring-0 transition-all h-12 text-base"
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-2">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-800 mb-2 block">
                    Shipping Address *
                  </Label>
                  <Textarea
                    id="address"
                    {...register('address')}
                    className="w-full border-gray-300 rounded-xl focus:border-gray-900 focus:ring-0 transition-all resize-none text-base"
                    placeholder="Enter your complete address"
                    rows={3}
                    disabled={isSubmitting}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600 mt-2">{errors.address.message}</p>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <h4 className="font-semibold text-gray-900 text-center">Order Summary</h4>
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.product._id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 flex-1">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-900 ml-4">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-900 text-lg">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-4 text-lg font-semibold transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                disabled={isSubmitting || state.items.length === 0}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  `Place Order • $${totalPrice.toFixed(2)}`
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
