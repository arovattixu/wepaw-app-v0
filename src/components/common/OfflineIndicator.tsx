import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { createMemoizedComponent } from '../../utils/memoization';

interface OfflineIndicatorProps {
  className?: string;
}

function OfflineIndicatorBase({ className = '' }: OfflineIndicatorProps) {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOffline(false);
    }

    function handleOffline() {
      setIsOffline(true);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50 ${className}`}
      role="alert"
    >
      <WifiOff className="h-5 w-5" />
      <span>You are currently offline</span>
    </div>
  );
}

export const OfflineIndicator = createMemoizedComponent(OfflineIndicatorBase);