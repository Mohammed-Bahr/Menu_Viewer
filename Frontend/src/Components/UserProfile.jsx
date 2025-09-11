// import React, { useState, useEffect } from 'react';
// import { User, Mail, Lock, Eye, EyeOff, Edit3, Save, X } from 'lucide-react';
// import { useAuth } from '../Context/Auth/AuthContext';
// import { useParams } from 'react-router-dom';
// Animated Light Rays Background Component (Pure CSS)
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
  const { Email } = useAuth(); // Call useAuth hook directly in the component
  const [userData, setUserData] = useState({
    firstName: "mohammed",
    lastName: "Bahr",
    email: "mohammedbahr686@gmail.com",
    password: "123"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editData, setEditData] = useState({ ...userData });
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fetching data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/user/email/${Email}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData({
          firstName: data.data.FirstName,
          lastName: data.data.LastName,
          email: data.data.Email,
          password: data.data.Password
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error appropriately - could set error state here
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [Email]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call to save data
    await new Promise(resolve => setTimeout(resolve, 800));
    // Here you would send data to your backend
    // const response = await fetch('/api/user', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(editData)
    // });
    setUserData({ ...editData });
    setIsEditing(false);
    setIsLoading(false);
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
  };

  if (isLoading && !isEditing) {
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
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center transform transition-all duration-500 hover:rotate-12 hover:scale-110 shadow-lg shadow-cyan-500/30">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-1 animate-fade-in">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-cyan-200 text-sm opacity-80">User Profile</p>
              </div>
            </div>

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
                      value={editData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Enter first name"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white flex items-center justify-between group hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <span className="font-medium">{userData.firstName}</span>
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
                      value={editData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Enter last name"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white flex items-center justify-between group hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <span className="font-medium">{userData.lastName}</span>
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
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                      placeholder="Enter email address"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white flex items-center justify-between group hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <span className="font-medium truncate">{userData.email}</span>
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
                        value={editData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
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
                      <span className="font-medium">{"•".repeat(userData.password.length)}</span>
                      <Lock className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                </div>
              </div>

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
