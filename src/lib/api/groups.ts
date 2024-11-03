import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { GroupPurchase, GroupMember, GroupStatus } from '../../types/groups';
import { calculateProgressiveDiscount } from './discounts';

interface CreateGroupParams {
  productId: string;
  userId: string;
  basePrice: number;
  minMembers: number;
  maxMembers: number;
  minDiscount: number;
  maxDiscount: number;
  duration: number;
}

interface JoinGroupParams {
  groupId: string;
  userId: string;
}

export async function createGroup({
  productId,
  userId,
  basePrice,
  minMembers,
  maxMembers,
  minDiscount,
  maxDiscount,
  duration
}: CreateGroupParams): Promise<GroupPurchase> {
  try {
    // Check for existing active group
    const existingGroup = await getActiveGroup(productId);
    if (existingGroup) {
      throw new Error('An active group already exists for this product');
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + duration);

    const { discountPercentage, finalPrice } = calculateProgressiveDiscount(
      1, // Starting with 1 member
      basePrice,
      minDiscount,
      maxDiscount
    );

    const initialMember: GroupMember = {
      userId,
      joinedAt: new Date().toISOString(),
      role: 'creator'
    };

    const group: Omit<GroupPurchase, 'id'> = {
      productId,
      basePrice,
      currentPrice: finalPrice,
      discountPercentage,
      status: 'FORMING',
      currentMembers: [initialMember],
      minMembers,
      maxMembers,
      minDiscount,
      maxDiscount,
      duration,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString()
    };

    const docRef = await addDoc(collection(db, 'groups'), {
      ...group,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      ...group
    };
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}

export async function joinGroup({
  groupId,
  userId
}: JoinGroupParams): Promise<GroupPurchase> {
  try {
    const groupRef = doc(db, 'groups', groupId);
    const groupSnap = await getDoc(groupRef);

    if (!groupSnap.exists()) {
      throw new Error('Group not found');
    }

    const group = groupSnap.data() as GroupPurchase;

    // Validate group status
    if (group.status !== 'FORMING') {
      throw new Error('This group is no longer accepting new members');
    }

    // Check if user is already a member
    if (group.currentMembers.some(member => member.userId === userId)) {
      throw new Error('You are already a member of this group');
    }

    // Check if group is full
    if (group.currentMembers.length >= group.maxMembers) {
      throw new Error('This group is already full');
    }

    // Check if group has expired
    const expiresAt = new Date(group.expiresAt);
    if (expiresAt < new Date()) {
      throw new Error('This group has expired');
    }

    // Calculate new pricing based on increased member count
    const { discountPercentage, finalPrice } = calculateProgressiveDiscount(
      group.currentMembers.length + 1,
      group.basePrice,
      group.minDiscount,
      group.maxDiscount
    );

    const newMember: GroupMember = {
      userId,
      joinedAt: new Date().toISOString(),
      role: 'member'
    };

    // Update group with new member and pricing
    await updateDoc(groupRef, {
      currentMembers: arrayUnion(newMember),
      currentPrice: finalPrice,
      discountPercentage,
      updatedAt: serverTimestamp(),
      status: group.currentMembers.length + 1 >= group.minMembers ? 'READY' : 'FORMING'
    });

    // Return updated group data
    const updatedGroupSnap = await getDoc(groupRef);
    return {
      id: updatedGroupSnap.id,
      ...updatedGroupSnap.data()
    } as GroupPurchase;
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
}

export async function getActiveGroup(productId: string): Promise<GroupPurchase | null> {
  try {
    const groupsRef = collection(db, 'groups');
    const q = query(
      groupsRef,
      where('productId', '==', productId),
      where('status', '==', 'FORMING')
    );
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }

    // Get the most recently created active group
    const groups = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as GroupPurchase[];

    return groups.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  } catch (error) {
    console.error('Error fetching active group:', error);
    return null;
  }
}

export async function getGroup(groupId: string): Promise<GroupPurchase | null> {
  try {
    const groupRef = doc(db, 'groups', groupId);
    const groupSnap = await getDoc(groupRef);

    if (!groupSnap.exists()) {
      return null;
    }

    return {
      id: groupSnap.id,
      ...groupSnap.data()
    } as GroupPurchase;
  } catch (error) {
    console.error('Error fetching group:', error);
    return null;
  }
}

export async function updateGroupStatus(
  groupId: string, 
  status: GroupStatus
): Promise<void> {
  try {
    const groupRef = doc(db, 'groups', groupId);
    await updateDoc(groupRef, {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating group status:', error);
    throw error;
  }
}

export async function getUserGroups(userId: string): Promise<GroupPurchase[]> {
  try {
    const groupsRef = collection(db, 'groups');
    const q = query(
      groupsRef,
      where('currentMembers', 'array-contains', { userId })
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as GroupPurchase[];
  } catch (error) {
    console.error('Error fetching user groups:', error);
    throw error;
  }
}