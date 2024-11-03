import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface LifeStageSelectProps {
  petType: 'dog' | 'cat';
  register: UseFormRegister<any>;
  error?: string;
}

export function LifeStageSelect({ petType, register, error }: LifeStageSelectProps) {
  const stages = petType === 'dog' 
    ? [
        { value: 'puppy', label: 'Puppy (0-1 year)' },
        { value: 'young', label: 'Young (1-3 years)' },
        { value: 'adult', label: 'Adult (3-7 years)' },
        { value: 'senior', label: 'Senior (7+ years)' }
      ]
    : [
        { value: 'kitten', label: 'Kitten (0-1 year)' },
        { value: 'young', label: 'Young (1-3 years)' },
        { value: 'adult', label: 'Adult (3-10 years)' },
        { value: 'senior', label: 'Senior (10+ years)' }
      ];

  return (
    <select
      {...register('lifeStage', { required: 'Life stage is required' })}
      className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
        error ? 'border-red-500' : ''
      }`}
    >
      <option value="">Select life stage</option>
      {stages.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}