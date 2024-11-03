import React from 'react';

const stats = [
  { value: '10k+', label: 'Active Users' },
  { value: '50k+', label: 'Orders' },
  { value: '$2M+', label: 'Group Savings' },
  { value: '4.9/5', label: 'User Rating' },
];

export function SocialProof() {
  return (
    <div className="bg-red-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-red-600 font-semibold mb-4">TRUSTED BY PET PARENTS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          {stats.map((stat, index) => (
            <div key={index} className="group cursor-default">
              <div className="text-4xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                {stat.value}
              </div>
              <span className="block text-sm font-normal text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}