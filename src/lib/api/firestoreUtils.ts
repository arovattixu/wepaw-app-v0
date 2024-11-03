import { 
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirebaseError } from '../firebase';

export const createDocument = async (collectionName: string, data: any) => {
  try {
    return await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  try {
    await updateDoc(doc(db, collectionName, id), {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
};

export const getDocument = async (collectionName: string, id: string) => {
  try {
    const docSnap = await getDoc(doc(db, collectionName, id));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
};

export const queryDocuments = async (
  collectionName: string,
  conditions: [string, any, any][]
) => {
  try {
    const q = query(
      collection(db, collectionName),
      ...conditions.map(([field, op, value]) => where(field, op, value))
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
};