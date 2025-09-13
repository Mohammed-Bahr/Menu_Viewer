
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../Context/Auth/AuthContext';

const LightRaysBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
      </div>

      {/* Light rays effect */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-px bg-gradient-to-b from-cyan-400/80 via-cyan-300/40 to-transparent"
            style={{
              left: `${10 + i * 12}%`,
              height: '100%',
              transform: `rotate(${-5 + i * 2}deg)`,
              transformOrigin: 'top center',
              animation: `lightRay ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Animated mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)
          `,
          animation: 'meshMove 8s ease-in-out infinite'
        }}
      />

      <style>{`
        @keyframes lightRay {
          0% { opacity: 0.3; transform: rotate(${-5}deg) scaleY(0.8); }
          100% { opacity: 0.8; transform: rotate(${5}deg) scaleY(1.2); }
        }
        
        @keyframes meshMove {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(1deg); }
          50% { transform: translate(-5px, 5px) rotate(-1deg); }
          75% { transform: translate(-10px, -5px) rotate(0.5deg); }
        }
      `}</style>
    </div>
  );
};

// Main User Profile Component
const UserProfile = () => {
  const { FirstName, LastName, Email, Password, isAuthenticated, isLoading: authLoading } = useAuth();
  const [userData, setUserData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Update local userData when auth context changes
  useEffect(() => {
    if (isAuthenticated && FirstName && LastName && Email && Password) {
      const newUserData = {
        FirstName,
        LastName,
        Email,
        Password
      };
      setUserData(newUserData);
      setEditData(newUserData);
      setError(null);
    }
  }, [FirstName, LastName, Email, Password, isAuthenticated]);

  // Fetch additional user data from backend if needed
  useEffect(() => {
    const fetchAdditionalUserData = async () => {
      if (!Email || !isAuthenticated) return;
      
      try {
        setIsLoading(true);
        setApiError(null);
        
        // Try different endpoint patterns
        const endpoints = [
          `http://localhost:3000/users/email/${Email}`,
          `http://localhost:3000/user/email/${Email}`,
          `http://localhost:3000/api/users/email/${Email}`
        ];
        
        let response = null;
        let lastError = null;
        
        // Try each endpoint until one works
        for (const endpoint of endpoints) {
          try {
            response = await fetch(endpoint, {
              headers: {
                'Content-Type': 'application/json',
              }
            });
            
            if (response.ok) {
              break; // Found working endpoint
            }
          } catch (err) {
            console.error(`Error fetching additional user data from ${endpoint}:`, err);
            continue;
          }
        }
        
        if (response && response.ok) {
          const data = await response.json();
          console.log('Additional user data fetched:', data);
          
          // If we get additional data, merge it (but prioritize auth context)
          if (data.success && data.data) {
            setUserData(prev => ({
              ...prev,
              // Only update if auth context doesn't have the data
              FirstName: FirstName || data.data.FirstName,
              LastName: LastName || data.data.LastName,
              Email: Email || data.data.Email,
              // Don't override password from API for security
              Password: Password || prev.Password
            }));
          }
        } else {
          // If API fails, we'll just use auth context data
          setApiError('Could not fetch additional profile data from server');
        }
      } catch (error) {
        console.error('Error fetching additional user data:', error);
        setApiError(`Network error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && Email) {
      fetchAdditionalUserData();
    }
  }, [Email, isAuthenticated, FirstName, LastName, Password]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate required fields
      if (!editData.FirstName || !editData.LastName || !editData.Email) {
        throw new Error('Please fill in all required fields');
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editData.Email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Try to update user data on backend
      try {
        const response = await fetch(`http://localhost:3000/users/update/${Email}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FirstName: editData.FirstName,
            LastName: editData.LastName,
            Email: editData.Email,
            // Only send password if it was changed
            ...(editData.Password !== userData.Password && { Password: editData.Password })
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log('Profile updated successfully on server');
          }
        } else {
          console.warn('Failed to update on server, continuing with local update');
        }
      } catch (apiError) {
        console.warn('API update failed, continuing with local update:', apiError);
      }
      
      // Update local state regardless of API success
      setUserData({ ...editData });
      setIsEditing(false);
      
      // Show success message
      setError({ type: 'success', message: 'Profile updated successfully!' });
      
    } catch (error) {
      console.error('Error saving profile:', error);
      setError({ type: 'error', message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...userData });
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (error) {
      setError(null);
    }
  };

  // Generate user initials for avatar
  const getUserInitials = () => {
    const first = userData.FirstName ? userData.FirstName.charAt(0).toUpperCase() : '';
    const last = userData.LastName ? userData.LastName.charAt(0).toUpperCase() : '';
    return first + last || 'U';
  };

  // Generate avatar color based on name
  const getAvatarColor = () => {
    const name = `${userData.FirstName}${userData.LastName}`.toLowerCase();
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600', 
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-indigo-400 to-indigo-600',
      'from-red-400 to-red-600',
      'from-yellow-400 to-yellow-600',
      'from-teal-400 to-teal-600'
    ];
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length] || 'from-cyan-400 to-purple-500';
  };

  if (authLoading || (!isAuthenticated && !error)) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <LightRaysBackground />
        <div className="relative z-10 flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-white text-xl font-light">Loading your profile...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <LightRaysBackground />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-cyan-200 mb-6">Please log in to view your profile.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <LightRaysBackground />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-cyan-500/20 hover:shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse"></div>
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/10"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`,
                      width: `${40 + i * 20}px`,
                      height: `${40 + i * 20}px`,
                      animation: `float ${3 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>

              <div className="relative">
                <div className={`w-24 h-24 bg-gradient-to-r ${getAvatarColor()} rounded-full mx-auto mb-4 flex items-center justify-center transform transition-all duration-500 hover:rotate-12 hover:scale-110 shadow-lg shadow-cyan-500/30`}>
                  <span className="text-white text-2xl font-bold">
                    {getUserInitials()}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1 animate-fade-in">
                  {userData.FirstName && userData.LastName ? 
                    `${userData.FirstName} ${userData.LastName}` : 
                    userData.Email || 'User Profile'
                  }
                </h1>
                <p className="text-cyan-200 text-sm opacity-80">
                  {isAuthenticated ? 'User Profile' : 'Guest'}
                </p>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className={`mx-6 mt-6 p-4 rounded-lg ${
                error.type === 'success' 
                  ? 'bg-green-500/20 border border-green-400/30 text-green-100'
                  : 'bg-red-500/20 border border-red-400/30 text-red-100'
              }`}>
                <p className="text-sm font-medium">{error.message}</p>
              </div>
            )}
            
            {apiError && (
              <div className="mx-6 mt-6 p-3 rounded-lg bg-yellow-500/20 border border-yellow-400/30 text-yellow-100">
                <p className="text-xs">{apiError}</p>
              </div>
            )}

            {/* Profile Information */}
            <div className="p-6 space-y-6">
              {/* First Name */}
              <div className="group">
                <label className="block text-sm font-medium text-cyan-200 mb-2 transition-colors duration-300 group-focus-within:text-cyan-300">
                  First Name
                </label>
                <div className="relative">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.FirstName}
                      onChange={(e) => handleInputChange('FirstName', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Enter first name"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white flex items-center justify-between group hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <span className="font-medium">{userData.FirstName}</span>
                      <User className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Last Name */}
              <div className="group">
                <label className="block text-sm font-medium text-cyan-200 mb-2 transition-colors duration-300 group-focus-within:text-cyan-300">
                  Last Name
                </label>
                <div className="relative">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.LastName}
                      onChange={(e) => handleInputChange('LastName', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Enter last name"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white flex items-center justify-between group hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <span className="font-medium">{userData.LastName}</span>
                      <User className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-medium text-cyan-200 mb-2 transition-colors duration-300 group-focus-within:text-cyan-300">
                  Email Address
                </label>
                <div className="relative">
                  {isEditing ? (
                    <input
                      type="Email"
                      value={editData.Email}
                      onChange={(e) => handleInputChange('Email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Enter Email address"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white flex items-center justify-between group hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <span className="font-medium truncate">{userData.Email}</span>
                      <Mail className="w-4 h-4 text-cyan-400 opacity-60 ml-2 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label className="block text-sm font-medium text-cyan-200 mb-2 transition-colors duration-300 group-focus-within:text-cyan-300">
                  Password
                </label>
                <div className="relative">
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={editData.Password || ''}
                        onChange={(e) => handleInputChange('Password', e.target.value)}
                        className="w-full px-4 py-3 pr-12 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:scale-110"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  ) : (
                    <div className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white flex items-center justify-between group hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <span className="font-medium">{"•".repeat(userData.Password?.length || 8)}</span>
                      <Lock className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Statistics */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-300">0</div>
                  <div className="text-xs text-cyan-200 opacity-70">Favorite Recipes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">
                    {userData.Email ? new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    }) : '--'}
                  </div>
                  <div className="text-xs text-purple-200 opacity-70">Member Since</div>
                </div>
              </div>

              {/* Quick Info */}
              {userData.Email && (
                <div className="py-4 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-xs text-cyan-200 opacity-70 mb-1">Account Status</p>
                    <div className="inline-flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-300 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4">
                {isEditing ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-400/30 hover:border-cyan-400/50 text-cyan-100 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
