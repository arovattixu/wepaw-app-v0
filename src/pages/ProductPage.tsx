import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Truck, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types/products';
import { GroupPurchaseSection } from '../components/group/GroupPurchaseSection';

interface ProductPageProps {
  product: Product;
  initialBuyMode?: 'alone' | 'group';
}

export function ProductPage({ product, initialBuyMode = 'alone' }: ProductPageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [expandedSection, setExpandedSection] = React.useState<string | null>('description');

  const handleBuyAlone = () => {
    if (!user) {
      localStorage.setItem('returnUrl', window.location.pathname);
      navigate('/login');
      return;
    }
    // Handle individual purchase
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-gray-500">Product not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-red-600' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4">
                {product.rating && (
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Group Purchase Section */}
            {product.groupPurchaseSettings?.enabled && (
              <GroupPurchaseSection product={product} />
            )}

            {/* Individual Purchase Option */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Individual Price</span>
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleBuyAlone}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield size={20} />
                <span className="text-sm">Quality Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Truck size={20} />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock size={20} />
                <span className="text-sm">24h Delivery</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <div className="prose prose-red max-w-none">
                  <p>{product.description}</p>
                  {product.features && (
                    <ul className="mt-4">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}