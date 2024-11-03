import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types/products';

const sampleProducts: Omit<Product, 'id'>[] = [
  {
    title: "Premium Dog Food - Large Breed",
    description: "Premium grain-free dog food specially formulated for large breed dogs.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80",
    category: "dog-food",
    groupPurchaseSettings: {
      minMembers: 5,
      maxMembers: 10,
      waitingPeriodHours: 24,
      baseDiscount: 20,
      maxDiscount: 40
    }
  },
  {
    title: "Organic Cat Litter - Ultra Absorbent",
    description: "Premium organic cat litter with superior odor control.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&w=800&q=80",
    category: "cat-supplies",
    groupPurchaseSettings: {
      minMembers: 5,
      maxMembers: 10,
      waitingPeriodHours: 24,
      baseDiscount: 20,
      maxDiscount: 35
    }
  }
];

export async function initializeFirebaseData() {
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    
    if (snapshot.empty) {
      const promises = sampleProducts.map(product => 
        addDoc(collection(db, 'products'), {
          ...product,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      );
      
      await Promise.all(promises);
      console.log('Sample data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
    throw new Error('Failed to initialize sample data');
  }
}