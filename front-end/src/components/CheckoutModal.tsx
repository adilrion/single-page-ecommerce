import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '../context/CartContext';

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
  const { clearCart, totalPrice } = useCart();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutForm) => {
    console.log('Order submitted:', data);
    setIsSubmitted(true);
    clearCart();
    
    // Reset form and close modal after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-60 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-light">
              {isSubmitted ? 'Order Confirmed!' : 'Checkout'}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-50">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-light mb-2 text-gray-900">Thank you for your order!</p>
              <p className="text-gray-600 font-light">
                Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-light text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className="mt-2 border-gray-200 focus:border-gray-400"
                  placeholder="John Doe"
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
                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white rounded-full font-light">
                  Place Order
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