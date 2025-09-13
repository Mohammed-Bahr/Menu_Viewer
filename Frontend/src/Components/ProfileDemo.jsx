import React from 'react';
import { useAuth } from '../Context/Auth/AuthContext';
import { User, ArrowRight } from 'lucide-react';

const ProfileDemo = () => {
  const { isAuthenticated, Email, FirstName, LastName } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Profile Access</h3>
            <p className="text-gray-600 text-sm">Please log in to view your profile</p>
            <a 
              href="/login" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1 mt-1"
            >
              Go to Login <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">
            {FirstName?.charAt(0)}{LastName?.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">
            Welcome, {FirstName} {LastName}!
          </h3>
          <p className="text-gray-600 text-sm">{Email}</p>
          <a 
            href={`/profile/${Email}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1 mt-1"
          >
            View Your Profile <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700 text-xs font-medium">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDemo;
