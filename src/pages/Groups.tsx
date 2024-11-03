import React from 'react';
import { Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Group {
  id: string;
  productId: string;
  productName: string;
  image: string;
  regularPrice: number;
  groupPrice: number;
  currentMembers: number;
  maxMembers: number;
  expiresAt: Date;
}

export default function Groups() {
  const [activeGroups] = React.useState<Group[]>([
    {
      id: '1',
      productId: '1',
      productName: 'Premium Dog Food - Large Breed',
      image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80',
      regularPrice: 79.99,
      groupPrice: 47.99,
      currentMembers: 7,
      maxMembers: 10,
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000)
    },
    {
      id: '2',
      productId: '2',
      productName: 'Organic Cat Litter - Ultra Absorbent',
      image: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=800&q=80',
      regularPrice: 34.99,
      groupPrice: 22.99,
      currentMembers: 4,
      maxMembers: 10,
      expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000)
    }
  ]);

  const formatTimeLeft = (expiresAt: Date) => {
    const diff = expiresAt.getTime() - Date.now();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Active Group Deals</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join these active groups to save on premium pet supplies. The more members join, the more everyone saves!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={group.image}
                  alt={group.productName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Save {Math.round((1 - group.groupPrice / group.regularPrice) * 100)}%
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{group.productName}</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Regular Price</span>
                    <span className="line-through">${group.regularPrice}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Group Price</span>
                    <span className="text-xl font-bold text-red-600">${group.groupPrice}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Users size={16} className="text-gray-400" />
                        <span>{group.currentMembers} of {group.maxMembers} joined</span>
                      </div>
                      <span className="text-red-600 font-medium">
                        {group.maxMembers - group.currentMembers} spots left!
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all duration-500"
                        style={{ width: `${(group.currentMembers / group.maxMembers) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock size={16} />
                      <span>Ends in</span>
                    </div>
                    <span className="font-medium">{formatTimeLeft(group.expiresAt)}</span>
                  </div>

                  <Link
                    to={`/products/${group.productId}`}
                    className="block w-full text-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Join Group
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}