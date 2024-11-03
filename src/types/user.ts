export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  pets: Pet[];
  createdAt: any; // FirebaseTimestamp
  updatedAt: any; // FirebaseTimestamp
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  lifeStage: 'puppy' | 'kitten' | 'adult' | 'senior';
  weight: number;
}