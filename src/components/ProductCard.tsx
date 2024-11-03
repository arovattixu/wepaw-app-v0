import React from 'react';
import { Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  groupPrice: number;
  savings: number;
}

export function ProductCard({ id, title, image, price, groupPrice, savings }: ProductCardProps) {
  const navigate = useNavigate();

  const handleBuyAlone = () => {
    navigate(`/products/${id}`, { state: { buyMode: 'alone' } });
  };

  const handleBuyGroup = () => {
    navigate(`/products/${id}`, { state: { buyMode: 'group' } });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <Link to={`/products/${id}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Save {savings}%
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Individual Price</span>
              <span className="font-medium">${price.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-red-600">
                <Users size={16} />
                <span>Group Price</span>
              </div>
              <span className="font-bold text-red-600">${groupPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="grid grid-cols-2 gap-3 p-4 pt-0">
        <button
          onClick={handleBuyAlone}
          className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
        >
          Buy Alone
        </button>
        <button
          onClick={handleBuyGroup}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
        >
          Buy in Group
        </button>
      </div>
    </div>
  );
}