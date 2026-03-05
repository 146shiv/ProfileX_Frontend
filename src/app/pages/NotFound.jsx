import React from 'react';
import { Link } from 'react-router';
import { Home, CreditCard } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
          <CreditCard className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>);

};