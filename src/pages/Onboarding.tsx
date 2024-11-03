import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
import { signUp } from '../lib/api/auth';
import PetForm from '../components/onboarding/PetForm';
import UserForm from '../components/onboarding/UserForm';
import { Link } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pets: [],
    name: '',
    email: '',
    password: '',
  });

  const handlePetSubmit = (pets: any[]) => {
    setFormData(prev => ({ ...prev, pets }));
    setStep(2);
  };

  const handleUserSubmit = async (userData: { name: string; email: string; password: string }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      setFormData(prev => ({ ...prev, ...userData }));
      
      await signUp(userData.email, userData.password, {
        name: userData.name,
        pets: formData.pets,
      });

      navigate('/dashboard');
    } catch (err: any) {
      if (err.message.includes('already registered')) {
        setError('This email is already registered. Please log in instead.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
      console.error('Signup error details:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint className="h-12 w-12 text-red-600" />
            <span className="text-3xl font-bold">WePaw</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {step === 1 ? "Tell us about your pets" : "Create your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-lg text-sm">
              {error}
              {error.includes('already registered') && (
                <div className="mt-2">
                  <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
                    Go to login
                  </Link>
                </div>
              )}
            </div>
          )}

          {step === 1 ? (
            <PetForm onSubmit={handlePetSubmit} initialPets={formData.pets} />
          ) : (
            <UserForm 
              onSubmit={handleUserSubmit} 
              isSubmitting={isSubmitting}
              initialData={{
                name: formData.name,
                email: formData.email,
                password: formData.password,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}