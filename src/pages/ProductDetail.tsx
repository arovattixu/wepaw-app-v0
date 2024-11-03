import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ProductPage } from './ProductPage';
import { getProduct } from '../lib/api/products';
import LoadingSpinner from '../components/LoadingSpinner';
import { GroupPurchaseModal } from '../components/group/GroupPurchaseModal';

interface LocationState {
  buyMode?: 'alone' | 'group';
}

interface GroupPurchase {
  enabled: boolean;
  minMembers: number;
  maxMembers: number;
  currentMembers: number;
  expiresAt: Date;
  discount: number;
}

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { buyMode } = (location.state as LocationState) || {};
  
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [product, setProduct] = React.useState<any>(null);
  const [showGroupModal, setShowGroupModal] = React.useState(buyMode === 'group');

  React.useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      try {
        const fetchedProduct = await getProduct(id);
        if (fetchedProduct) {
          // Initialize group purchase data if not present
          const defaultGroupPurchase: GroupPurchase = {
            enabled: true,
            minMembers: 5,
            maxMembers: 10,
            currentMembers: 0,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
            discount: 40
          };

          setProduct({
            ...fetchedProduct,
            groupPurchase: fetchedProduct.groupPurchase || defaultGroupPurchase
          });
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <ProductPage product={product} initialBuyMode={buyMode} />
      {showGroupModal && (
        <GroupPurchaseModal
          isOpen={showGroupModal}
          onClose={() => setShowGroupModal(false)}
          productId={id || ''}
          groupId="new-group"
          product={{
            title: product.title,
            image: product.images?.[0] || product.image,
            regularPrice: product.price,
            groupPrice: product.groupPrice
          }}
        />
      )}
    </>
  );
}