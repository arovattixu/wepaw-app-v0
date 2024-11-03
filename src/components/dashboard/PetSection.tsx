import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { PetCard } from '../pets/PetCard';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Pet } from '../../types/pets';
import { AddPetModal } from './AddPetModal';

export function PetSection() {
  const { user } = useAuth();
  const [pets, setPets] = React.useState<Pet[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchPets() {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setPets(userData.pets || []);
        }
      } catch (err) {
        console.error('Error fetching pets:', err);
        setError('Failed to load pets. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, [user]);

  const handlePetAdded = (newPet: Pet) => {
    setPets(prevPets => [...prevPets, newPet]);
  };

  const handlePetRemove = async (index: number) => {
    if (!user) return;

    try {
      const newPets = pets.filter((_, i) => i !== index);
      const userRef = doc(db, 'users', user.uid);
      
      await updateDoc(userRef, {
        pets: newPets,
        updatedAt: new Date()
      });

      setPets(newPets);
    } catch (err) {
      console.error('Error removing pet:', err);
      setError('Failed to remove pet. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">My Pets</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">My Pets</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Pet
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {pets.length > 0 ? (
          <div className="grid gap-4">
            {pets.map((pet, index) => (
              <PetCard
                key={`${pet.name}-${index}`}
                pet={pet}
                onRemove={() => handlePetRemove(index)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <div className="max-w-sm mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pets added yet</h3>
              <p className="text-gray-500 mb-6">
                Add your pets to get personalized recommendations and join group purchases for their supplies.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Pet
              </button>
            </div>
          </div>
        )}
      </div>

      <AddPetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPetAdded={handlePetAdded}
      />
    </>
  );
}