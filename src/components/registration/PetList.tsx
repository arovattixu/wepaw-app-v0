import React from 'react';
import { X } from 'lucide-react';
import { Pet } from '../../types/pets';

interface PetListProps {
  pets: Pet[];
  onRemove: (index: number) => void;
}

export function PetList({ pets, onRemove }: PetListProps) {
  if (pets.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No pets added yet. Add your first pet below.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-900">Your Pets</h3>
      {pets.map((pet, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="font-medium text-gray-900">{pet.name}</p>
            <p className="text-sm text-gray-500">
              {pet.type} • {pet.breed} • {pet.lifeStage} • {pet.weight}kg
            </p>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}