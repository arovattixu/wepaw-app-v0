import React from 'react';
import { Users, Truck, DollarSign } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Group Buying Power',
    description: 'Join forces with other pet parents to unlock wholesale prices and amazing deals.',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Get your pet supplies delivered to your doorstep at no extra cost.',
  },
  {
    icon: DollarSign,
    title: 'Save up to 40%',
    description: 'Enjoy significant savings on premium pet food, toys, and accessories.',
  },
];

export function Features() {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-200 group-hover:bg-red-100">
                <feature.icon className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}