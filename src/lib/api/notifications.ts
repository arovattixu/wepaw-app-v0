import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Notification, NotificationType } from '../../types/notifications';

export async function createNotification({
  type,
  userId,
  title,
  message,
  groupId,
  productId
}: Omit<Notification, 'id' | 'read' | 'createdAt'>): Promise<string> {
  const notificationData = {
    type,
    userId,
    title,
    message,
    groupId,
    productId,
    read: false,
    createdAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, 'notifications'), notificationData);
  return docRef.id;
}

export async function markNotificationAsRead(
  notificationId: string
): Promise<void> {
  const notificationRef = doc(db, 'notifications', notificationId);
  await updateDoc(notificationRef, {
    read: true
  });
}

export async function getUserNotifications(
  userId: string,
  limit: number = 20
): Promise<Notification[]> {
  const notificationsRef = collection(db, 'notifications');
  const q = query(
    notificationsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limit)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Notification[];
}

export async function getUnreadCount(userId: string): Promise<number> {
  const notificationsRef = collection(db, 'notifications');
  const q = query(
    notificationsRef,
    where('userId', '==', userId),
    where('read', '==', false)
  );

  const snapshot = await getDocs(q);
  return snapshot.size;
}