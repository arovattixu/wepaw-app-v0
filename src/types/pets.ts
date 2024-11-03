export type PetType = 'dog' | 'cat';

export interface Pet {
  name: string;
  type: PetType;
  breed: string;
  lifeStage: 'puppy/kitten' | 'young' | 'adult' | 'senior';
  weight: number;
}

export interface PetFormData extends Pet {
  id?: string;
}