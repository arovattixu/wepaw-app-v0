import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Pet } from '../../types/pets';
import { PetRegistrationForm } from '../pets/PetRegistrationForm';

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPetAdded: (pet: Pet) => void;
}

export function AddPetModal({ isOpen, onClose, onPetAdded }: AddPetModalProps) {
  const { user } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (pet: Pet) => {
    if (!user) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedPets = [...(userData.pets || []), pet];
        
        await updateDoc(userRef, {
          pets: updatedPets,
          updatedAt: new Date()
        });

        onPetAdded(pet);
        onClose();
      }
    } catch (err) {
      console.error('Error adding pet:', err);
      setError('Failed to add pet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
          aria-hidden="true" 
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <h2 
              className="text-2xl font-bold text-gray-900 mb-6" 
              id="modal-title"
            >
              Add New Pet
            </h2>

            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            <PetRegistrationForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}