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
  Timestamp
} from 'firebase/firestore';
import { db, handleFirebaseError } from '../firebase';
import { Product, GroupPurchase } from '../../types/products';
import { calculateGroupPrice, calculateCurrentDiscount } from '../../utils/priceUtils';

const PRODUCTS_COLLECTION = 'products';
const GROUP_PURCHASES_COLLECTION = 'groupPurchases';

export async function getProducts(): Promise<Product[]> {
  try {
    const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    const product = {
      id: docSnap.id,
      ...docSnap.data()
    } as Product;

    return product;
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}

export async function getActiveGroupPurchase(productId: string): Promise<GroupPurchase | null> {
  try {
    const q = query(
      collection(db, GROUP_PURCHASES_COLLECTION),
      where('productId', '==', productId),
      where('status', '==', 'active')
    );
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }

    const groupDoc = snapshot.docs[0];
    return {
      id: groupDoc.id,
      ...groupDoc.data()
    } as GroupPurchase;
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}

export async function createGroupPurchase(
  productId: string, 
  userId: string
): Promise<GroupPurchase> {
  try {
    const product = await getProduct(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const existingGroup = await getActiveGroupPurchase(productId);
    if (existingGroup) {
      throw new Error('An active group purchase already exists for this product');
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + (product.groupPurchaseSettings.waitingPeriodHours * 60 * 60 * 1000));

    const currentDiscount = calculateCurrentDiscount(
      1, // Starting with 1 member
      product.groupPurchaseSettings.baseDiscount,
      product.groupPurchaseSettings.maxDiscount,
      product.groupPurchaseSettings.minMembers
    );

    const groupPrice = calculateGroupPrice(product.price, currentDiscount);

    const groupPurchaseData = {
      productId,
      createdBy: userId,
      members: [userId],
      status: 'active' as const,
      createdAt: Timestamp.now(),
      expiresAt: Timestamp.fromDate(expiresAt),
      currentPrice: groupPrice,
      currentDiscount
    };

    const docRef = await addDoc(collection(db, GROUP_PURCHASES_COLLECTION), groupPurchaseData);
    
    return {
      id: docRef.id,
      ...groupPurchaseData
    };
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}

export async function joinGroupPurchase(groupId: string, userId: string): Promise<void> {
  try {
    const groupRef = doc(db, GROUP_PURCHASES_COLLECTION, groupId);
    const groupDoc = await getDoc(groupRef);

    if (!groupDoc.exists()) {
      throw new Error('Group purchase not found');
    }

    const groupData = groupDoc.data() as GroupPurchase;
    
    if (groupData.status !== 'active') {
      throw new Error('This group purchase is no longer active');
    }

    if (groupData.members.includes(userId)) {
      throw new Error('You are already a member of this group');
    }

    const product = await getProduct(groupData.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (groupData.members.length >= product.groupPurchaseSettings.maxMembers) {
      throw new Error('This group is already full');
    }

    const newMembers = [...groupData.members, userId];
    const currentDiscount = calculateCurrentDiscount(
      newMembers.length,
      product.groupPurchaseSettings.baseDiscount,
      product.groupPurchaseSettings.maxDiscount,
      product.groupPurchaseSettings.minMembers
    );

    const newPrice = calculateGroupPrice(product.price, currentDiscount);

    await updateDoc(groupRef, {
      members: newMembers,
      currentPrice: newPrice,
      currentDiscount,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    throw new Error(handleFirebaseError(error));
  }
}