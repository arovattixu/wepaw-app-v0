import React from 'react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { 
  Users, 
  AlertCircle, 
  CreditCard, 
  CheckCircle, 
  XCircle,
  Bell
} from 'lucide-react';
import { Notification, NotificationType } from '../../types/notifications';

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'GROUP_JOIN':
      case 'GROUP_LEAVE':
        return Users;
      case 'PAYMENT_REMINDER':
        return CreditCard;
      case 'GROUP_COMPLETE':
        return CheckCircle;
      case 'GROUP_EXPIRED':
        return XCircle;
      default:
        return Bell;
    }
  };

  const Icon = getIcon(notification.type);

  return (
    <div
      onClick={onClick}
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
        !notification.read ? 'bg-red-50' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 ${
          !notification.read ? 'text-red-600' : 'text-gray-400'
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            {notification.title}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {notification.message}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {formatDistanceToNow(notification.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}