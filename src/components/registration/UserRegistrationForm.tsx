import React from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { FormField } from '../common/FormField';
import { UserRegistration } from '../../types/user';

interface UserRegistrationFormProps {
  onSubmit: (data: UserRegistration) => Promise<void>;
}

export function UserRegistrationForm({ onSubmit }: UserRegistrationFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserRegistration>();

  const validatePassword = (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;

    if (!isLongEnough) return 'Password must be at least 8 characters';
    if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
    if (!hasNumber) return 'Password must contain at least one number';
    if (!hasSpecialChar) return 'Password must contain at least one special character';

    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="First Name" error={errors.firstName?.message}>
          <input
            type="text"
            {...register('firstName', {
              required: 'First name is required',
              maxLength: {
                value: 50,
                message: 'First name cannot exceed 50 characters'
              }
            })}
            className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
              errors.firstName ? 'border-red-500' : ''
            }`}
          />
        </FormField>

        <FormField label="Last Name" error={errors.lastName?.message}>
          <input
            type="text"
            {...register('lastName', {
              required: 'Last name is required',
              maxLength: {
                value: 50,
                message: 'Last name cannot exceed 50 characters'
              }
            })}
            className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
              errors.lastName ? 'border-red-500' : ''
            }`}
          />
        </FormField>
      </div>

      <FormField label="Email" error={errors.email?.message}>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
      </FormField>

      <FormField label="Password" error={errors.password?.message}>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              validate: validatePassword
            })}
            className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 ${
              errors.password ? 'border-red-500' : ''
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {!errors.password && (
          <ul className="mt-2 text-xs text-gray-500 space-y-1">
            <li>• At least 8 characters</li>
            <li>• One uppercase letter</li>
            <li>• One lowercase letter</li>
            <li>• One number</li>
            <li>• One special character (!@#$%^&*)</li>
          </ul>
        )}
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}