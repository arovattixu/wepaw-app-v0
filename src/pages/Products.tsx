import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { getProducts } from '../lib/api/products';
import { Product } from '../types/products';
import LoadingSpinner from '../components/LoadingSpinner';
import { initializeFirebaseData } from '../utils/initializeData';

export default function Products() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        await initializeFirebaseData();
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err: any) {
        console.error('Error loading products:', err);
        setError(err.message || 'Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join group purchases to save up to 40% on premium pet supplies. The more pet parents join, the more everyone saves!
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-500">
            No products available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                groupPrice={product.groupPrice}
                savings={product.savings}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}