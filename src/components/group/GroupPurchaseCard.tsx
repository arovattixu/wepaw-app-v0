import React from 'react';
import { Users, Clock } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Product } from '../../types/products';
import { GroupPurchase } from '../../types/groups';
import { calculateGroupPrice, calculateCurrentDiscount } from '../../utils/priceUtils';

interface GroupPurchaseCardProps {
  product: Product;
  activeGroup: GroupPurchase | null;
  onJoinGroup: () => void;
}

export function GroupPurchaseCard({ 
  product, 
  activeGroup, 
  onJoinGroup 
}: GroupPurchaseCardProps) {
  const { 
    groupPurchaseSettings: { 
      minMembers, 
      maxMembers, 
      waitingPeriodHours,
      baseDiscount,
      maxDiscount
    } 
  } = product;

  const memberCount = activeGroup?.currentMembers?.length || 0;
  const currentDiscount = calculateCurrentDiscount(
    memberCount,
    baseDiscount,
    maxDiscount,
    minMembers
  );
  const groupPrice = calculateGroupPrice(product.price, currentDiscount);
  const remainingSpots = maxMembers - memberCount;

  const getTimeRemaining = () => {
    if (!activeGroup) return null;
    
    const expiresAt = new Date(activeGroup.expiresAt);
    return formatDistanceToNow(expiresAt);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Group Purchase</h3>
        
        <div className="flex items-baseline justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Regular Price</p>
            <p className="text-lg line-through text-gray-400">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm text-gray-500">Group Price</p>
            <p className="text-2xl font-bold text-red-600">
              ${groupPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {activeGroup ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Users size={16} className="text-gray-400" />
                  <span>{memberCount} of {maxMembers} joined</span>
                </div>
                {remainingSpots > 0 && (
                  <span className="text-red-600 font-medium">
                    {remainingSpots} spots left!
                  </span>
                )}
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-500"
                  style={{ width: `${(memberCount / maxMembers) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock size={16} />
                <span>Ends</span>
              </div>
              <span className="font-medium">{getTimeRemaining()}</span>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-600">
            <p>Start a new group purchase:</p>
            <ul className="mt-2 space-y-1">
              <li>• Minimum {minMembers} members required</li>
              <li>• {waitingPeriodHours} hours to complete group</li>
              <li>• Save up to {maxDiscount}% off</li>
            </ul>
          </div>
        )}

        <button
          onClick={onJoinGroup}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          {activeGroup ? 'Join Group' : 'Start Group Purchase'}
        </button>
      </div>
    </div>
  );
}