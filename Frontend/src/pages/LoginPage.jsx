// import React, { useRef, useState } from 'react';
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const emailRef = useRef();
//   const passwordRef = useRef();

//   const navigate = useNavigate();

//   function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault(); // prevent page reload

//     const Email = emailRef.current.value;
//     const Password = passwordRef.current.value;

//     if (!Email || !Password) {
//       setError("Check submitted data.");
//       return;
//     }

//     if (!isValidEmail(Email)) {
//       setError("Enter valid email");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:3000/users/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ Email, Password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         setError(
//           errorData.data ||
//             `Unable to register user. Try different credentials. Status: ${response.status}`
//         );
//         return;
//       }

//       const data = await response.json();
//       console.log("Loing in successful:", data);

//       setError("");
//       setSuccess(true);
//       localStorage.setItem("user", JSON.stringify({ Email, Password }));

//       setTimeout(() => {
//         navigate("/home");
//       }, 1500);
//     } catch (err) {
//       console.error("Error while fetching data ->", err);
//       setError(`Network error: ${err.message}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 md:p-6 lg:p-8 mt-6 flex justify-center items-center">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
//         <form onSubmit={handleLogin}>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//               Email
//             </label>
//             <input
//               ref={emailRef}
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
//               py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               ref={passwordRef}
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
//               py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//             />
//           </div>

//           {error && <p className="text-red-500 mb-3">{error}</p>}
//           {success && <p className="text-green-500 mb-3">Login successfully!</p>}

//           <button
//             type="submit"
//             className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useRef, useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
  import { useAuth } from '../Context/Auth/AuthContext';
const LoginPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const {login} = useAuth();

  // function isValidEmail(email) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }


  function isValidEmail(email) {
    if (!email) {
        return { isValid: false, error: "Email is required" };
    }
    
    if (typeof email !== 'string') {
        return { isValid: false, error: "Email must be a string" };
    }

    email = email.trim();

    if (email.length === 0) {
        return { isValid: false, error: "Email cannot be empty" };
    }

    if (email.length > 254) {
        return { isValid: false, error: "Email is too long (max 254 characters)" };
    }

    if (!email.includes('@')) {
        return { isValid: false, error: "Email must contain @ symbol" };
    }

    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) {
        return { isValid: false, error: "Email must contain exactly one @ symbol" };
    }

    const [localPart, domainPart] = email.split('@');

    if (localPart.length === 0) {
        return { isValid: false, error: "Email must have content before @" };
    }

    if (localPart.length > 64) {
        return { isValid: false, error: "Email local part is too long (max 64 characters)" };
    }

    if (domainPart.length === 0) {
        return { isValid: false, error: "Email must have domain after @" };
    }

    if (!domainPart.includes('.')) {
        return { isValid: false, error: "Email domain must contain at least one dot" };
    }

    if (localPart.startsWith('.') || localPart.endsWith('.')) {
        return { isValid: false, error: "Email cannot start or end with a dot before @" };
    }

    if (localPart.includes('..')) {
        return { isValid: false, error: "Email cannot contain consecutive dots" };
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
        return { isValid: false, error: "Email format is invalid" };
    }

    return { isValid: true, error: null };
}

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const Email = emailRef.current.value;
    const Password = passwordRef.current.value;

    if (!Email || !Password) {
      setError("Check submitted data.");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(Email)) {
      setError("Enter valid email");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email, Password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(
          errorData.data ||
            `Unable to login user. Try different credentials. Status: ${response.status}`
        );
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);

      setError("");
      setSuccess(true);
      localStorage.setItem("user", JSON.stringify({ Email, Password }));

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      console.error("Error while fetching data ->", err);
      setError(`Network error: ${err.message}`);
    }
    setIsLoading(false);
    login(Email, Password);
  };

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, x: -20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const backgroundVariants = {
    animate: {
      background: [
        "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)",
        "linear-gradient(45deg, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff6b6b)",
        "linear-gradient(45deg, #45b7d1, #96ceb4, #feca57, #ff6b6b, #4ecdc4)",
        "linear-gradient(45deg, #96ceb4, #feca57, #ff6b6b, #4ecdc4, #45b7d1)",
        "linear-gradient(45deg, #feca57, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)",
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 180, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      variants={backgroundVariants}
      animate="animate"
      style={{
        background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)"
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-xl opacity-20`}
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{
              delay: i * 0.5,
              duration: 4 + Math.random() * 4
            }}
          />
        ))}

        {/* Sparkle Effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4 text-white/60" />
          </motion.div>
        ))}
      </div>

      {/* Login Form Container */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glassmorphism Card */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden"
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            borderColor: "rgba(255, 255, 255, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mb-6 shadow-lg"
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
              }}
              transition={{ duration: 0.6 }}
            >
              <LogIn className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2 
              className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              className="text-white/70 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Sign in to continue your journey
            </motion.p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-white/90 text-sm font-semibold mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <motion.input
                  ref={emailRef}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  whileFocus={{ 
                    scale: 1.02,
                    borderColor: "#f472b6",
                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-white/90 text-sm font-semibold mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <motion.input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  whileFocus={{ 
                    scale: 1.02,
                    borderColor: "#f472b6",
                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-200"
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Login successful! Redirecting...</span>
              
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/25 focus:outline-none focus:ring-4 focus:ring-pink-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              // disabled={isLoading}
            >
              <motion.div
                className="flex items-center justify-center space-x-3"
                animate={isLoading ? { opacity: 0.7 } : { opacity: 1 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-lg">Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span className="text-lg">Sign In</span>
                  </>
                )}
              </motion.div>
              
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />
            </motion.button>

            {/* Additional Links */}
            <motion.div 
              variants={itemVariants} 
              className="text-center space-y-4 pt-4"
            >
              <p className="text-white/70">
                Don't have an account?{' '}
                <motion.a
                  href="/register"
                  className="text-pink-500 hover:text-pink-200 font-semibold transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign up here
                </motion.a>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;