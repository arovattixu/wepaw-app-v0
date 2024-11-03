import React from 'react';
import { Plus, X } from 'lucide-react';
import { Pet } from '../../types/pets';
import { BreedSelect } from './BreedSelect';
import { FormField } from '../common/FormField';

interface PetFormProps {
  onSubmit: (pets: Pet[]) => void;
  initialPets?: Pet[];
}

export function PetForm({ onSubmit, initialPets = [] }: PetFormProps) {
  const [pets, setPets] = React.useState<Pet[]>(initialPets);
  const [currentPet, setCurrentPet] = React.useState<Pet>({
    name: '',
    type: 'dog',
    breed: '',
    lifeStage: 'adult',
    weight: 0
  });

  const handleAddPet = () => {
    if (currentPet.name && currentPet.breed && currentPet.weight) {
      setPets([...pets, currentPet]);
      setCurrentPet({
        name: '',
        type: 'dog',
        breed: '',
        lifeStage: 'adult',
        weight: 0
      });
    }
  };

  const handleRemovePet = (index: number) => {
    setPets(pets.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pets.length > 0) {
      onSubmit(pets);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {pets.map((pet, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">{pet.name}</p>
              <p className="text-sm text-gray-500">
                {pet.type} • {pet.breed} • {pet.lifeStage} • {pet.weight}kg
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleRemovePet(index)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <FormField label="Nome dell'animale">
          <input
            type="text"
            value={currentPet.name}
            onChange={(e) => setCurrentPet({ ...currentPet, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            placeholder="Inserisci il nome del tuo animale"
          />
        </FormField>

        <FormField label="Tipo di animale">
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="dog"
                checked={currentPet.type === 'dog'}
                onChange={(e) => setCurrentPet({ ...currentPet, type: e.target.value as 'dog' | 'cat' })}
                className="text-red-600 focus:ring-red-500"
              />
              <span>Cane</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="cat"
                checked={currentPet.type === 'cat'}
                onChange={(e) => setCurrentPet({ ...currentPet, type: e.target.value as 'dog' | 'cat' })}
                className="text-red-600 focus:ring-red-500"
              />
              <span>Gatto</span>
            </label>
          </div>
        </FormField>

        <FormField label="Razza">
          <BreedSelect
            petType={currentPet.type}
            value={currentPet.breed}
            onChange={(breed) => setCurrentPet({ ...currentPet, breed })}
          />
        </FormField>

        <FormField label="Fase di vita">
          <select
            value={currentPet.lifeStage}
            onChange={(e) => setCurrentPet({ ...currentPet, lifeStage: e.target.value as Pet['lifeStage'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="puppy">Cucciolo (0-1 anno)</option>
            <option value="young">Giovane (1-3 anni)</option>
            <option value="adult">Adulto (3-7 anni)</option>
            <option value="senior">Anziano (7+ anni)</option>
          </select>
        </FormField>

        <FormField label="Peso (kg)">
          <input
            type="number"
            value={currentPet.weight || ''}
            onChange={(e) => setCurrentPet({ ...currentPet, weight: parseFloat(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            placeholder="Inserisci il peso in kg"
            step="0.1"
            min="0"
          />
        </FormField>

        <button
          type="button"
          onClick={handleAddPet}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Aggiungi animale
        </button>
      </div>

      <div>
        <button
          type="submit"
          disabled={pets.length === 0}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continua
        </button>
      </div>
    </form>
  );
}