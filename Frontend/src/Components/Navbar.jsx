// import React, { useState, useEffect } from "react";
// import { Menu, X, ShoppingCart, User, LogOut, Settings } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../Context/Auth/AuthContext";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(3); // Replace with actual cart count

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { Email, logout , isAuthenticated } = useAuth();  // Use authentication context
//   // const isLoggedIn = isAuthenticated;  // Check if user exists
//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsOpen(false);
//     setUserMenuOpen(false);
//   }, [location]);

//   // Navigation items based on authentication state
//   const getNavLinks = () => {
//     const commonLinks = [
//       { title: "Home", path: "/" },
//       { title: "Menu", path: "/menu" },
//     ];

//     if (isAuthenticated) {
//       return [
//         ...commonLinks,
//         { title: "Orders", path: "/orders" },
//       ];
//     } else {
//       return [
//         ...commonLinks,
//         { title: "Login", path: "/login" },
//         { title: "Register", path: "/register" },
//       ];
//     }
//   };

//   const navLinks = getNavLinks();

//   // Navigation handlers
//   const navigate = (path) => {
//     navigate(path);
//     setIsOpen(false);
//   };

//   const handleCartClick = () => {
//     if (isAuthenticated) {
//       navigate('/cart');
//     } else {
//       // Redirect to login with return url
//       navigate('/login', { state: { from: '/cart' } });
//     }
//   };

//   const handleOrderNow = () => {
//     if (isAuthenticated) {
//       navigate('/menu');
//     } else {
//       navigate('/login', { state: { from: '/menu' } });
//     }
//   };

//   const handleLogout = () => {
//     logout(); // Use the logout function from AuthContext
//     setUserMenuOpen(false);
//     navigate('/');
//   };

//   const handleUserMenuClick = () => {
//     if (isLoggedIn) {
//       setUserMenuOpen(!userMenuOpen);
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
//           scrolled 
//             ? "bg-gray-400/15 backdrop-blur-md rounded-full mx-2 mt-3 shadow-lg py-2" 
//             : "bg-transparent py-4"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
//           {/* Logo */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className={`text-2xl font-bold font-serif cursor-pointer ${
//               scrolled ? "text-blue-600" : "text-blue-200"
//             }`}
//             onClick={() => navigate('/')}
//           >
//             🍴 Foodie
//           </motion.div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <button
//                 key={link.path}
//                 onClick={() => navigate(link.path)}
//                 className={`relative font-medium group transition-colors ${
//                   scrolled ? "text-gray-700 hover:text-red-500" : "text-blue-200 hover:text-white"
//                 } ${location.pathname === link.path ? "text-red-500" : ""}`}
//               >
//                 {link.title}
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full" />
//                 {location.pathname === link.path && (
//                   <motion.span
//                     layoutId="underline"
//                     className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500"
//                   />
//                 )}
//               </button>
//             ))}
//           </div>



//           {/* Right Side Icons */}

//           <div className="hidden md:flex items-center space-x-4">
//             {/* Cart Button */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleCartClick}
//               className={`relative p-2 rounded-full transition-colors ${
//                 scrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-zinc-500"
//               }`}
//             >
//               <ShoppingCart size={20} />
//               {cartCount > 0 && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                 >
//                   {cartCount > 9 ? '9+' : cartCount}
//                 </motion.span>
//               )}
//             </motion.button>

//             {/* User Menu */}
//             <div className="relative">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleUserMenuClick}
//                 className={`p-2 rounded-full transition-colors ${
//                   scrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-zinc-500"
//                 }`}
//               >
//                 <User size={20} />
//               </motion.button>

//               {/* User Dropdown */}
//               <AnimatePresence>
//                 {userMenuOpen && isLoggedIn && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border"
//                   >
//                     <button
//                       onClick={() => navigate('/profile')}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
//                     >
//                       <User size={16} />
//                       Profile
//                     </button>
//                     <button
//                       onClick={() => navigate('/orders')}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
//                     >
//                       <ShoppingCart size={16} />
//                       My Orders
//                     </button>
//                     <button
//                       onClick={() => navigate('/settings')}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
//                     >
//                       <Settings size={16} />
//                       Settings
//                     </button>
//                     <hr className="my-2" />
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Order Now Button */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleOrderNow}
//               className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300"
//             >
//               Order Now
//             </motion.button>
//           </div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden z-60"
//           >
//             {isOpen ? (
//               <X size={28} className={scrolled ? "text-gray-700" : "text-white"} />
//             ) : (
//               <Menu size={28} className={scrolled ? "text-gray-700" : "text-white"} />
//             )}
//           </motion.button>
//         </div>

//         {/* Mobile Dropdown */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="md:hidden bg-white shadow-lg overflow-hidden rounded-b-2xl mx-2"
//             >
//               <div className="px-6 py-4 space-y-4">
//                 {navLinks.map((link) => (
//                   <button
//                     key={link.path}
//                     onClick={() => navigate(link.path)}
//                     className={`block w-full text-left text-gray-700 hover:text-red-500 transition py-2 ${
//                       location.pathname === link.path ? "text-red-500 font-medium" : ""
//                     }`}
//                   >
//                     {link.title}
//                   </button>
//                 ))}

//                 {/* Mobile User Actions */}
//                 {isLoggedIn && (
//                   <div className="pt-4 border-t border-gray-100 space-y-2">
//                     <button
//                       onClick={() => navigate('/profile')}
//                       className="block w-full text-left text-gray-700 hover:text-red-500 transition py-2"
//                     >
//                       Profile
//                     </button>
//                     <button
//                       onClick={() => navigate('/orders')}
//                       className="block w-full text-left text-gray-700 hover:text-red-500 transition py-2"
//                     >
//                       My Orders
//                     </button>
//                   </div>
//                 )}

//                 <div className="pt-4 border-t border-gray-100 space-y-3">
//                   {/* Mobile Cart */}
//                   <button
//                     onClick={handleCartClick}
//                     className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-200 transition"
//                   >
//                     <ShoppingCart size={18} />
//                     Cart {cartCount > 0 && `(${cartCount})`}
//                   </button>

//                   {/* Mobile Order Now */}
//                   <button 
//                     onClick={handleOrderNow}
//                     className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow hover:from-red-600 hover:to-red-700 transition-all duration-300"
//                   >
//                     Order Now
//                   </button>

//                   {/* Mobile Logout */}
//                   {isLoggedIn && (
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-red-600 text-sm py-2"
//                     >
//                       Logout
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* Overlay for mobile menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsOpen(false)}
//             className="fixed inset-0 bg-black/20 z-40 md:hidden"
//           />
//         )}
//       </AnimatePresence>

//       {/* Click outside to close user menu */}
//       {userMenuOpen && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setUserMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// }





import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth/AuthContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Replace with actual cart count

  const location = useLocation();
  const navigate = useNavigate();
  const { Email, logout, isAuthenticated } = useAuth();  // Use authentication context

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu & user menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Navigation items based on authentication state

  // Navigation handlers


  const handleLoveClick = () => {
    if (isAuthenticated) {
      navigate("/favourites");
    } else {
      // Redirect to login with return url
      navigate("/login", { state: { from: "/cart" } });
    }
  };

  const handleOrderNow = () => {
    if (isAuthenticated) {
      navigate("/menu");
    } else {
      navigate("/login", { state: { from: "/menu" } });
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const handleUserMenuClick = () => {
    if (isAuthenticated) {
      setUserMenuOpen(!userMenuOpen);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-gray-400/15 backdrop-blur-md rounded-full mx-2 mt-3 shadow-lg py-2"
            : "bg-stone-200 rounded-full m-2 p-1 "
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-2xl font-bold font-serif cursor-pointer ${scrolled ? "text-blue-600" : "text-blue-400"
              }`}
            onClick={() => navigate("/")}
          >
            🍴 Foodie
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() =>navigate('/')}
              className={`relative font-medium group transition-colors ${scrolled
                  ? "text-gray-700 hover:text-red-500"
                  : "text-blue-400 hover:text-yellow-400"
                }
                  ${location.pathname === '/' ? "text-red-500" : ""}`}
            >
              Home        
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full" />
              {location.pathname === '/' && (
                <motion.span
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500"
                />
              )}
            </button>
          </div>

           <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() =>navigate('/menu')}
              className={`relative font-medium group transition-colors ${scrolled
                  ? "text-gray-700 hover:text-red-500"
                  : "text-blue-400 hover:text-yellow-400"
                }
                  ${location.pathname === '/menu' ? "text-red-500" : ""}`}
            >
              Menu        
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full" />
              
            </button>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoveClick}
              className={`relative p-2 rounded-full transition-colors ${scrolled
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-white/10 text-zinc-500"
                }`}
            >
              <FavoriteBorderIcon size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUserMenuClick}
                className={`p-2 rounded-full transition-colors ${scrolled
                    ? "hover:bg-gray-100 text-gray-700"
                    : "hover:bg-white/10 text-zinc-500"
                  }`}
              >
                <User size={20} />
              </motion.button>

              {/* User Dropdown */}
              <AnimatePresence>
                {userMenuOpen && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border"
                  >
                    <button
                      onClick={() => navigate(`/profile/${Email}`)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <User size={16} />
                      Profile
                    </button>
                    <button
                      onClick={() => navigate("/favourites")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FavoriteBorderIcon size={16} />
                      My Favourites
                    </button>
                    
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Now Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOrderNow}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Discover More
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-60"
          >
            {isOpen ? (
              <X
                size={28}
                className={scrolled ? "text-gray-700" : "text-red-500"}
              />
            ) : (
              <Menu
                size={28}
                className={scrolled ? "text-gray-700" : "text-red-500"}
              />
            )}
          </motion.button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg overflow-hidden rounded-b-2xl mx-2"
            >
              <div className="px-6 py-4 space-y-4">
                <button
                    onClick={() => navigate('/')}
                    className={`block w-full text-left text-gray-700 hover:text-red-500 transition py-2 ${location.pathname === '/'
                        ? "text-red-500 font-medium"
                        : ""
                      }`}
                  >
                    Home
                  </button>



                  <button
                    onClick={() => navigate('/menu')}
                    className={`block w-full text-left text-gray-700 hover:text-red-500 transition py-2 ${location.pathname === '/menu'
                        ? "text-red-500 font-medium"
                        : ""
                      }`}
                  >
                    Menu
                  </button>

                {/* Mobile User Actions */}
                {isAuthenticated && (
                  <div className="pt-4 border-t border-gray-100 space-y-2">
                    <button
                      onClick={() => navigate(`/profile/${Email}`)}
                      className="block w-full text-left text-gray-700 hover:text-red-500 transition py-2"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate("/favourites")}
                      className="block w-full text-left text-gray-700 hover:text-red-500 transition py-2"
                    >
                       My Favourites
                    </button>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  {/* Mobile Cart */}
                  <button
                    onClick={handleLoveClick}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <FavoriteBorderIcon size={18} />
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </button>

                  {/* Mobile Order Now */}
                  <button
                    onClick={handleOrderNow}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  >
                    Discover More
                  </button>

                  {/* Mobile Logout */}
                  {isAuthenticated && (
                    <button
                      onClick={handleLogout}
                      className="w-full text-red-600 text-sm py-2"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  );
}
