import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RegistrationFlow } from '../components/registration/RegistrationFlow';

function Register() {
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/products');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint className="h-12 w-12 text-red-600" />
            <span className="text-3xl font-bold">WePaw</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Crea il tuo account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Hai già un account?{' '}
          <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
            Accedi
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegistrationFlow />
        </div>
      </div>
    </div>
  );
}

export default Register;