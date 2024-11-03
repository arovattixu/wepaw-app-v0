import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
    </div>
  );
}