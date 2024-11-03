import React from 'react';
import { Users } from 'lucide-react';

interface GroupProgressProps {
  current: number;
  total: number;
  remainingSpots: number;
}

export function GroupProgress({ current, total, remainingSpots }: GroupProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Users size={20} className="text-red-600" />
          <span className="font-medium">{current} of {total} members</span>
        </div>
        <span className="text-red-600 font-medium">{remainingSpots} spots left!</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}