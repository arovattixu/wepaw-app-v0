import React from 'react';
import { X } from 'lucide-react';
import { Pet } from '../../types/pets';

interface PetCardProps {
  pet: Pet;
  onRemove: () => void;
}

export function PetCard({ pet, onRemove }: PetCardProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-red-100 hover:border-red-200 transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
          <span className="text-2xl">{pet.type === 'dog' ? '🐕' : '🐱'}</span>
        </div>
        <div>
          <span className="font-medium text-gray-900">{pet.name}</span>
          <div className="text-sm text-gray-500">
            {pet.breed} • <span className="capitalize">{pet.lifeStage}</span> • {pet.weight}kg
          </div>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        aria-label="Remove pet"
      >
        <X size={20} />
      </button>
    </div>
  );
}