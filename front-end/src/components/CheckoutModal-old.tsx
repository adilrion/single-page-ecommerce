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
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900">
            {isSubmitted ? 'Order Confirmed!' : 'Complete Your Order'}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-8 w-8 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-light mb-2 text-gray-900">Thank you for your order!</p>
              <p className="text-gray-600 font-light mb-2">
                Order Number: #{orderNumber}
              </p>
              <p className="text-gray-600 font-light">
                Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="name" className="text-sm font-light text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className="mt-2 border-gray-200 focus:border-gray-400"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1 font-light">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-light text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="mt-2 border-gray-200 focus:border-gray-400"
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1 font-light">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-light text-gray-700">Address</Label>
                <Textarea
                  id="address"
                  {...register('address')}
                  className="mt-2 border-gray-200 focus:border-gray-400"
                  placeholder="123 Main St, City, State, ZIP"
                  rows={3}
                  disabled={isSubmitting}
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1 font-light">{errors.address.message}</p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-light text-gray-600">Total</span>
                  <span className="font-medium text-lg text-black">${totalPrice.toFixed(2)}</span>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-full font-light disabled:bg-gray-400"
                  disabled={isSubmitting || state.items.length === 0}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;