import React from 'react';
import { useForm } from 'react-hook-form';
import { HelpCircle } from 'lucide-react';
import { Pet } from '../../types/pets';
import { FormField } from '../common/FormField';
import { BreedSelect } from './BreedSelect';

interface PetRegistrationFormProps {
  onSubmit: (pet: Pet) => void;
  isSubmitting?: boolean;
}

export function PetRegistrationForm({ onSubmit, isSubmitting = false }: PetRegistrationFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Pet>({
    defaultValues: {
      type: 'dog',
      lifeStage: 'adult'
    }
  });

  const petType = watch('type');
  const breedValue = watch('breed');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField 
        label="Pet Name" 
        error={errors.name?.message}
        tooltip="Enter your pet's name"
      >
        <input
          type="text"
          {...register('name', {
            required: 'Pet name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
          className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            errors.name ? 'border-red-500' : ''
          }`}
          placeholder="E.g. Max, Luna"
          disabled={isSubmitting}
        />
      </FormField>

      <FormField 
        label="Pet Type" 
        error={errors.type?.message}
        tooltip="Select whether you have a dog or cat"
      >
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="dog"
              {...register('type')}
              className="text-red-600 focus:ring-red-500"
              disabled={isSubmitting}
            />
            <span>Dog</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="cat"
              {...register('type')}
              className="text-red-600 focus:ring-red-500"
              disabled={isSubmitting}
            />
            <span>Cat</span>
          </label>
        </div>
      </FormField>

      <FormField 
        label="Breed" 
        error={errors.breed?.message}
        tooltip="Select your pet's breed"
      >
        <BreedSelect
          petType={petType}
          value={breedValue}
          onChange={(breed) => setValue('breed', breed, { shouldValidate: true })}
          disabled={isSubmitting}
          error={errors.breed?.message}
        />
      </FormField>

      <FormField 
        label="Life Stage" 
        error={errors.lifeStage?.message}
        tooltip="Select your pet's age group"
      >
        <select
          {...register('lifeStage')}
          className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            errors.lifeStage ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        >
          {petType === 'dog' ? (
            <>
              <option value="puppy">Puppy (0-1 year)</option>
              <option value="young">Young (1-3 years)</option>
              <option value="adult">Adult (3-7 years)</option>
              <option value="senior">Senior (7+ years)</option>
            </>
          ) : (
            <>
              <option value="kitten">Kitten (0-1 year)</option>
              <option value="young">Young (1-3 years)</option>
              <option value="adult">Adult (3-10 years)</option>
              <option value="senior">Senior (10+ years)</option>
            </>
          )}
        </select>
      </FormField>

      <FormField 
        label="Weight (kg)" 
        error={errors.weight?.message}
        tooltip="Enter your pet's weight in kilograms"
      >
        <input
          type="number"
          step="0.1"
          {...register('weight', {
            required: 'Weight is required',
            min: { value: 0.1, message: 'Weight must be greater than 0' },
            max: { value: 100, message: 'Weight cannot exceed 100kg' }
          })}
          className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            errors.weight ? 'border-red-500' : ''
          }`}
          placeholder="E.g. 5.5"
          disabled={isSubmitting}
        />
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isSubmitting ? 'Adding Pet...' : 'Add Pet'}
      </button>

      <div className="mt-4 flex items-start space-x-2 text-sm text-gray-500">
        <HelpCircle className="h-5 w-5 flex-shrink-0" />
        <p>
          Enter your pet's details to help us personalize their experience and recommend the right products.
        </p>
      </div>
    </form>
  );
}