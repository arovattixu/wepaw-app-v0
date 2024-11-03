import { initializeApp, getApps } from 'firebase/app';
import { 
  initializeFirestore, 
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  persistentLocalCache,
  persistentSingleTabManager
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore with persistent cache
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    tabManager: persistentSingleTabManager()
  })
});

// Initialize Auth
const auth = getAuth(app);

export { app, db, auth };