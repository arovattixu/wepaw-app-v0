import { 
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db, handleFirebaseError } from '../firebase';

export async function createDocument<T extends DocumentData>(
  collectionName: string, 
  data: T
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}

export async function updateDocument<T extends DocumentData>(
  collectionName: string, 
  id: string, 
  data: Partial<T>
): Promise<void> {
  try {
    await updateDoc(doc(db, collectionName, id), {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}

export async function getDocument<T extends DocumentData>(
  collectionName: string, 
  id: string
): Promise<T | null> {
  try {
    const docSnap = await getDoc(doc(db, collectionName, id));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as T : null;
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}

export async function queryDocuments<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as T[];
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}