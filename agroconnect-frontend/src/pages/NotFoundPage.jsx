import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <MapPin className="h-20 w-20 text-primary-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been relocated.
        </p>
        <div className="space-y-4">
          <Link to="/">
            <Button variant="primary" size="lg" className="flex items-center justify-center mx-auto">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            Need help? <Link to="/contact" className="text-primary-600 hover:text-primary-500">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;