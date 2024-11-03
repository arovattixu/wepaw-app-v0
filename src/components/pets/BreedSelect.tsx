import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { dogBreeds, catBreeds } from '../../data/breeds';
import { PetType } from '../../types/pets';

interface BreedSelectProps {
  petType: PetType;
  value: string;
  onChange: (breed: string) => void;
  disabled?: boolean;
  error?: string;
}

export function BreedSelect({ 
  petType, 
  value = '', 
  onChange,
  disabled = false,
  error 
}: BreedSelectProps) {
  const [search, setSearch] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const breeds = petType === 'dog' ? dogBreeds : catBreeds;
  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        setFocusedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        setFocusedIndex(prev => 
          prev < filteredBreeds.length - 1 ? prev + 1 : prev
        );
        e.preventDefault();
        break;
      case 'ArrowUp':
        setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
        e.preventDefault();
        break;
      case 'Enter':
        if (focusedIndex >= 0) {
          onChange(filteredBreeds[focusedIndex]);
          setSearch(filteredBreeds[focusedIndex]);
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        e.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        e.preventDefault();
        break;
    }
  };

  const handleBreedSelect = (breed: string) => {
    onChange(breed);
    setSearch(breed);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            setFocusedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 pl-10 ${
            error ? 'border-red-500' : ''
          }`}
          placeholder={`Search ${petType === 'dog' ? 'dog' : 'cat'} breeds...`}
          disabled={disabled}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {isOpen && !disabled && filteredBreeds.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto border border-gray-200">
          {filteredBreeds.map((breed, index) => (
            <li
              key={breed}
              className={`px-4 py-2 cursor-pointer ${
                focusedIndex === index ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleBreedSelect(breed)}
            >
              {breed}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}