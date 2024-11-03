import React from 'react';
import { Settings, PawPrint, Bell, Package, CreditCard } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { PetSection } from '../components/dashboard/PetSection';
import { ProfileSection } from '../components/dashboard/ProfileSection';

export default function Dashboard() {
  const [activeTab, setActiveTab] = React.useState('pets');

  const tabs = [
    { id: 'pets', label: 'My Pets', icon: PawPrint },
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <DashboardLayout>
      <div className="flex space-x-8">
        <nav className="w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex-1">
          {activeTab === 'pets' && <PetSection />}
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Orders</h2>
              <p className="text-gray-600">No orders yet. Start shopping to see your order history.</p>
            </div>
          )}
          {activeTab === 'billing' && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Billing</h2>
              <p className="text-gray-600">No payment methods added yet.</p>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
              <p className="text-gray-600">No new notifications.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}