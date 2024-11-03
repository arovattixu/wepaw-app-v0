import React from 'react';
import { Users, Clock, Share2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Product, GroupPurchase } from '../../types/products';
import { calculateCurrentDiscount, calculateGroupPrice } from '../../utils/priceUtils';
import { GroupMemberList } from './GroupMemberList';
import { GroupProgress } from './GroupProgress';
import { GroupTimer } from './GroupTimer';
import { ShareOptions } from './ShareOptions';
import { CheckoutForm } from './CheckoutForm';

const DEFAULT_GROUP_SETTINGS = {
  minMembers: 5,
  maxMembers: 10,
  waitingPeriodHours: 24,
  baseDiscount: 20,
  maxDiscount: 40
};

interface GroupPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  groupId?: string;
  product: Product;
  activeGroup?: GroupPurchase | null;
}

export function GroupPurchaseModal({
  isOpen,
  onClose,
  productId,
  groupId,
  product,
  activeGroup
}: GroupPurchaseModalProps) {
  const { user } = useAuth();
  const [step, setStep] = React.useState<'details' | 'checkout' | 'confirmation'>('details');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Ensure we have valid group settings by using defaults if not provided
  const groupSettings = product?.groupPurchaseSettings || DEFAULT_GROUP_SETTINGS;

  const pricing = React.useMemo(() => {
    const basePrice = product?.price || 0;
    const memberCount = activeGroup?.members?.length || 1;
    
    const currentDiscount = calculateCurrentDiscount(
      memberCount,
      groupSettings.baseDiscount,
      groupSettings.maxDiscount,
      groupSettings.minMembers
    );
    
    const groupPrice = calculateGroupPrice(basePrice, currentDiscount);
    
    return {
      originalPrice: basePrice,
      groupPrice,
      discountPercentage: currentDiscount
    };
  }, [product, activeGroup, groupSettings]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Group Purchase</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            {step === 'details' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{product.title}</h3>
                    <div className="mt-1 flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        ${pricing.groupPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${pricing.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {activeGroup && (
                  <>
                    <GroupProgress
                      current={activeGroup.members.length}
                      total={groupSettings.maxMembers}
                      remainingSpots={groupSettings.maxMembers - activeGroup.members.length}
                    />
                    <GroupTimer expiresAt={new Date(activeGroup.expiresAt).getTime()} />
                    <GroupMemberList members={activeGroup.members} />
                  </>
                )}

                {groupId && <ShareOptions groupId={groupId} />}

                <button
                  onClick={() => setStep('checkout')}
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : `Join Group & Save ${pricing.discountPercentage}%`}
                </button>

                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Group Rules</p>
                      <ul className="mt-2 space-y-1">
                        <li>• {groupSettings.minMembers} members needed for maximum discount</li>
                        <li>• {groupSettings.waitingPeriodHours}-hour window to complete the group</li>
                        <li>• Members are visible to the group</li>
                        <li>• Share with friends to fill spots faster</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'checkout' && (
              <CheckoutForm
                product={{
                  title: product.title,
                  groupPrice: pricing.groupPrice
                }}
                onComplete={() => setStep('confirmation')}
                onBack={() => setStep('details')}
              />
            )}

            {step === 'confirmation' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">You've Joined the Group!</h3>
                <p className="text-gray-600 mb-6">
                  We'll notify you when new members join and when the group is complete.
                </p>
                <div className="space-y-4">
                  {groupId && (
                    <button
                      onClick={() => {/* TODO: Implement share */}}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                    >
                      <Share2 size={20} />
                      <span>Share with Friends</span>
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="w-full text-gray-600 hover:text-gray-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}