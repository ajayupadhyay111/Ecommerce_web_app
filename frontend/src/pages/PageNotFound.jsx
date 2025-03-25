import React from 'react';
import { ArrowLeft, ShoppingBag, Search } from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        
        {/* Error Message */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Page not found</h2>
        <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        
        {/* Illustration */}
        <div className="mt-8 flex justify-center">
          <div className="relative">
            <ShoppingBag size={120} className="text-indigo-200" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Search size={40} className="text-indigo-600" />
            </div>
          </div>
        </div>
        
        {/* Suggestions */}
        <div className="mt-8 space-y-4 text-left bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-900">Here are some helpful links:</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                Back to homepage
              </a>
            </li>
          </ul>
        </div>
        
        {/* Contact Support */}
        <p className="mt-8 text-gray-600">
          If you need further assistance, please{" "}
          <a href="/contact" className="text-indigo-600 hover:text-indigo-800">
            contact our support team
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;