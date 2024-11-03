import React from 'react';
import { PawPrint, ShoppingBag, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../lib/api/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // You might want to show an error toast here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <PawPrint className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold">WePaw</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/products')}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg transition duration-200"
              >
                <ShoppingBag size={20} />
                <span>Shop</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg transition duration-200"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}