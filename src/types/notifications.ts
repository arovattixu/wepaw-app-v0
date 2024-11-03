export type NotificationType = 
  | 'GROUP_JOIN' 
  | 'GROUP_LEAVE' 
  | 'PAYMENT_REMINDER' 
  | 'GROUP_COMPLETE' 
  | 'GROUP_EXPIRED' 
  | 'PURCHASE_STATUS';

export interface Notification {
  id: string;
  type: NotificationType;
  userId: string;
  title: string;
  message: string;
  groupId?: string;
  productId?: string;
  read: boolean;
  createdAt: Date;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  groupActivity: boolean;
  payments: boolean;
  marketing: boolean;
}