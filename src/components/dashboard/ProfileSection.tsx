import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { FormField } from '../common/FormField';
import { AlertCircle, Loader } from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export function ProfileSection() {
  const { user } = useAuth();
  const [profile, setProfile] = React.useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: user.email || '',
            phone: userData.phone || '',
            address: userData.address || ''
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        address: profile.address,
        updatedAt: new Date()
      });

      setSuccessMessage('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Profile Settings</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm space-y-6">
        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField label="First Name">
            <input
              type="text"
              value={profile.firstName}
              onChange={e => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </FormField>

          <FormField label="Last Name">
            <input
              type="text"
              value={profile.lastName}
              onChange={e => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            />
          </FormField>
        </div>

        <FormField label="Email">
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm cursor-not-allowed"
          />
          <p className="mt-1 text-sm text-gray-500">
            Email cannot be changed
          </p>
        </FormField>

        <FormField label="Phone">
          <input
            type="tel"
            value={profile.phone}
            onChange={e => setProfile({ ...profile, phone: e.target.value })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            placeholder="+1 (555) 000-0000"
          />
        </FormField>

        <FormField label="Address">
          <textarea
            value={profile.address}
            onChange={e => setProfile({ ...profile, address: e.target.value })}
            rows={3}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            placeholder="Enter your full address"
          />
        </FormField>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
            <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}