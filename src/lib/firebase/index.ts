// Re-export everything from individual modules
export { firebaseConfig } from './config';
export { app, db, auth } from './init';
export { handleFirebaseError } from './errors';

// Re-export commonly used Firebase types
export type {
  DocumentData,
  QueryDocumentSnapshot,
  DocumentReference,
  CollectionReference,
  Query,
  QuerySnapshot,
  Timestamp,
  WhereFilterOp,
  OrderByDirection
} from 'firebase/firestore';

export type {
  User,
  UserCredential,
  Auth,
  AuthError
} from 'firebase/auth';