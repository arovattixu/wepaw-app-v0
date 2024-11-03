import React from 'react';
import { ProductCard } from './ProductCard';

const products = [
  {
    title: "Premium Dog Food - Large Breed",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80",
    price: 79.99,
    groupPrice: 47.99,
    savings: 40
  },
  {
    title: "Organic Cat Litter - Ultra Absorbent",
    image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=800&q=80",
    price: 34.99,
    groupPrice: 22.99,
    savings: 35
  },
  {
    title: "Interactive Pet Toy Bundle",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
    price: 49.99,
    groupPrice: 32.99,
    savings: 30
  },
  {
    title: "Natural Pet Shampoo & Conditioner",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
    price: 24.99,
    groupPrice: 15.99,
    savings: 35
  },
  {
    title: "Orthopedic Pet Bed - Memory Foam",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    price: 89.99,
    groupPrice: 54.99,
    savings: 38
  },
  {
    title: "Dental Care Kit for Pets",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    price: 29.99,
    groupPrice: 18.99,
    savings: 36
  }
];

export function ProductSection() {
  return (
    <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join group purchases to save up to 40% on premium pet supplies. The more pet parents join, the more everyone saves!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}