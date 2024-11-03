import React from 'react';
import { useParams } from 'react-router-dom';
import { GroupPurchaseModal } from '../components/group/GroupPurchaseModal';

export default function GroupBuy() {
  const { id } = useParams();
  const [product, setProduct] = React.useState({
    title: "Premium Dog Food",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80",
    regularPrice: 79.99,
    groupPrice: 47.99
  });

  return (
    <GroupPurchaseModal
      isOpen={true}
      onClose={() => {}}
      productId={id || ''}
      groupId="new-group"
      product={product}
    />
  );
}