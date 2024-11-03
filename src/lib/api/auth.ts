import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  UserCredential 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, handleFirebaseError } from '../firebase';

export const signUp = async (email: string, password: string, userData: any): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    
    await setDoc(doc(db, 'users', user.uid), {
      ...userData,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return userCredential;
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
};

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
};