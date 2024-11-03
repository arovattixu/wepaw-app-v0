export type GroupStatus = 'FORMING' | 'READY' | 'COMPLETED' | 'EXPIRED' | 'CANCELLED';

export interface GroupMember {
  userId: string;
  joinedAt: string;
  role: 'creator' | 'member';
}

export interface GroupPurchase {
  id: string;
  productId: string;
  basePrice: number;
  currentPrice: number;
  discountPercentage: number;
  status: GroupStatus;
  currentMembers: GroupMember[];
  minMembers: number;
  maxMembers: number;
  minDiscount: number;
  maxDiscount: number;
  duration: number; // in hours
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}