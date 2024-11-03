import React from 'react';
import { Tooltip } from './Tooltip';

interface FormFieldProps {
  label: string;
  error?: string;
  tooltip?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, tooltip, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {tooltip ? (
            <Tooltip content={tooltip}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
            </Tooltip>
          ) : (
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
        </div>
      </div>
      {children}
      {error && (
        <p className="text-sm text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}