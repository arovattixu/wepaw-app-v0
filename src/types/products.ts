export interface GroupPurchaseSettings {
  minMembers: number;
  maxMembers: number;
  waitingPeriodHours: number;
  baseDiscount: number;
  maxDiscount: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  groupPurchaseSettings: GroupPurchaseSettings;
}

export interface GroupPurchase {
  id: string;
  productId: string;
  createdBy: string;
  members: string[];
  status: 'active' | 'completed' | 'expired';
  createdAt: Date;
  expiresAt: Date;
  currentPrice: number;
  currentDiscount: number;
}