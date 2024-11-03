import React from 'react';
import { X, Dog, Cat } from 'lucide-react';
import { Pet } from '../../types/pets';

interface PetCardProps {
  pet: Pet;
  onRemove: () => void;
}

export function PetCard({ pet, onRemove }: PetCardProps) {
  const PetIcon = pet.type === 'dog' ? Dog : Cat;
  
  const getLifeStageLabel = () => {
    switch (pet.lifeStage) {
      case 'puppy':
        return 'Puppy';
      case 'kitten':
        return 'Kitten';
      case 'young':
        return 'Young';
      case 'adult':
        return 'Adult';
      case 'senior':
        return 'Senior';
      default:
        return pet.lifeStage;
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-200 transition-colors duration-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
          <PetIcon className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{pet.name}</h3>
          <div className="text-sm text-gray-500">
            {pet.breed} • {getLifeStageLabel()} • {pet.weight}kg
          </div>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
        aria-label="Remove pet"
      >
        <X size={20} />
      </button>
    </div>
  );
}