import React from 'react';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartSaving = () => {
    if (user) {
      // User is logged in, navigate to products
      navigate('/products');
    } else {
      // User is not logged in, navigate to onboarding
      navigate('/onboarding');
    }
  };

  const handleDiscoverProducts = () => {
    navigate('/products');
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Save Big on Pet Supplies
            <span className="block text-red-600">Together</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join other pet parents and unlock wholesale prices through group purchases. Save up to 40% on premium pet supplies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartSaving}
              className="bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 transition duration-200 flex items-center justify-center space-x-2 text-lg font-semibold shadow-sm hover:shadow-md"
            >
              <span>{user ? 'Start Shopping' : 'Start Saving Today'}</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button 
              onClick={handleDiscoverProducts}
              className="bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition duration-200 flex items-center justify-center space-x-2 text-lg font-semibold shadow-sm hover:shadow-md"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Discover Products</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}