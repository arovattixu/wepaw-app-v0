import React from 'react';
import { ChevronLeft, CreditCard, Truck, Lock } from 'lucide-react';
import { FormField } from '../onboarding/FormField';

interface CheckoutFormProps {
  product: {
    title: string;
    groupPrice: number;
  };
  onComplete: () => void;
  onBack: () => void;
}

export function CheckoutForm({ product, onComplete, onBack }: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete();
    } catch (error) {
      // TODO: Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{product.title}</span>
          <span className="font-medium">${product.groupPrice}</span>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 flex items-center space-x-2">
          <Truck size={20} />
          <span>Shipping Information</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField label="First Name">
            <input
              type="text"
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </FormField>
          
          <FormField label="Last Name">
            <input
              type="text"
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </FormField>
        </div>

        <FormField label="Address">
          <input
            type="text"
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="City">
            <input
              type="text"
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </FormField>
          
          <FormField label="ZIP Code">
            <input
              type="text"
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </FormField>
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 flex items-center space-x-2">
          <CreditCard size={20} />
          <span>Payment Information</span>
        </h3>
        
        <FormField label="Card Number">
          <input
            type="text"
            required
            placeholder="1234 5678 9012 3456"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Expiry Date">
            <input
              type="text"
              required
              placeholder="MM/YY"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </FormField>
          
          <FormField label="CVC">
            <input
              type="text"
              required
              placeholder="123"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </FormField>
        </div>
      </div>

      {/* Security Note */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Lock size={16} />
        <span>Your payment information is secure and encrypted</span>
      </div>

      {/* Actions */}
      <div className="flex justify-between space-x-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Complete Purchase'}
        </button>
      </div>
    </form>
  );
}