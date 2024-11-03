import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetList } from './PetList';
import { PetForm } from '../pets/PetForm';
import { UserRegistrationForm } from './UserRegistrationForm';
import { signUp } from '../../lib/api/auth';
import { Pet } from '../../types/pets';
import { UserRegistration } from '../../types/user';

type Step = 'pets' | 'user';

export function RegistrationFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('pets');
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddPet = (newPets: Pet[]) => {
    setPets(newPets);
    setCurrentStep('user');
  };

  const handleUserSubmit = async (userData: UserRegistration) => {
    try {
      await signUp(userData.email, userData.password, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        pets,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 'pets' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'
          }`}>
            1
          </div>
          <div className="w-16 h-1 bg-red-100" />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 'user' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'
          }`}>
            2
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {currentStep === 'pets' ? (
        <div className="space-y-6">
          <PetList pets={pets} onRemove={(index) => setPets(pets.filter((_, i) => i !== index))} />
          <PetForm onSubmit={handleAddPet} initialPets={pets} />
        </div>
      ) : (
        <UserRegistrationForm onSubmit={handleUserSubmit} />
      )}
    </div>
  );
}