import { FirebaseError } from 'firebase/app';

export function handleFirebaseError(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      // Auth Errors
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please try logging in instead.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      
      // Firestore Errors
      case 'permission-denied':
        return 'You do not have permission to perform this action.';
      case 'unavailable':
        return 'Service temporarily unavailable. Please try again later.';
      case 'not-found':
        return 'The requested resource was not found.';
      case 'already-exists':
        return 'This resource already exists.';
      
      // Network Errors
      case 'network-request-failed':
        return 'Network error. Please check your connection.';
      
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }
  return 'An unexpected error occurred.';
}