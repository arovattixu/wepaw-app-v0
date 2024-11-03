import React from 'react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { TrendingDown } from 'lucide-react';
import { PriceHistoryEntry } from '../../types/groups';

interface GroupPriceHistoryProps {
  history: PriceHistoryEntry[];
  originalPrice: number;
}

export function GroupPriceHistory({ history, originalPrice }: GroupPriceHistoryProps) {
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 flex items-center space-x-2">
        <TrendingDown className="w-5 h-5 text-red-600" />
        <span>Price History</span>
      </h4>

      <div className="space-y-2">
        {sortedHistory.map((entry, index) => {
          const discount = ((originalPrice - entry.price) / originalPrice) * 100;
          
          return (
            <div 
              key={index}
              className="flex items-center justify-between text-sm p-2 rounded-lg bg-gray-50"
            >
              <div>
                <span className="font-medium">${entry.price.toFixed(2)}</span>
                <span className="text-gray-500 ml-2">
                  ({Math.round(discount)}% off)
                </span>
              </div>
              <div className="text-right">
                <div className="text-gray-500">
                  {entry.memberCount} members
                </div>
                <div className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(entry.timestamp))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-500">
        * Prices decrease as more members join within the 24-hour window
      </div>
    </div>
  );
}