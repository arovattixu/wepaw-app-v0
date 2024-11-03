import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Product } from '../../types/products';
import { GroupPurchase } from '../../types/groups';
import { getActiveGroupPurchase } from '../../lib/api/products';
import { createGroup, joinGroup } from '../../lib/api/groups';
import { GroupPurchaseCard } from './GroupPurchaseCard';
import { GroupPurchaseModal } from './GroupPurchaseModal';

interface GroupPurchaseSectionProps {
  product: Product;
}

export function GroupPurchaseSection({ product }: GroupPurchaseSectionProps) {
  const { user } = useAuth();
  const [activeGroup, setActiveGroup] = React.useState<GroupPurchase | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadActiveGroup();
  }, [product.id]);

  const loadActiveGroup = async () => {
    try {
      const group = await getActiveGroupPurchase(product.id);
      setActiveGroup(group);
    } catch (error) {
      console.error('Error loading active group:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!user) {
      // Store return URL and redirect to login
      localStorage.setItem('returnUrl', window.location.pathname);
      window.location.href = '/login';
      return;
    }

    setShowModal(true);
  };

  const handleGroupAction = async () => {
    if (!user) return;

    try {
      if (activeGroup) {
        await joinGroup(activeGroup.id, user.uid, user.displayName || 'Anonymous');
      } else {
        const { minMembers, maxMembers, waitingPeriodHours } = product.groupPurchaseSettings;
        await createGroup(
          product.id,
          user.uid,
          user.displayName || 'Anonymous',
          product.price,
          minMembers,
          maxMembers
        );
      }
      
      // Reload active group data
      await loadActiveGroup();
    } catch (error) {
      console.error('Error with group action:', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <>
      <GroupPurchaseCard
        product={product}
        activeGroup={activeGroup}
        onJoinGroup={handleJoinGroup}
      />

      {showModal && (
        <GroupPurchaseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          product={product}
          activeGroup={activeGroup}
          onConfirm={handleGroupAction}
        />
      )}
    </>
  );
}