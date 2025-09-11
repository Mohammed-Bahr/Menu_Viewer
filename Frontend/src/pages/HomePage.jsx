// import React from "react";

// export default function HomePage() {
//   return (
//     <div>
//       <section className="flex  justify-between items-center px-20 bg-linear-to-r from-blue-100 to-blue-400 py-10">
//         {/* left side */}
//         <div >
//           <h1>Food App</h1>
//           <p>Order food from your favourite restaurant</p>
//           <button>Order Now</button>
//         </div>

//         {/* right side */}
//         <div>
//           <img width='350px' height='350px' src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="food" />
//         </div>
//       </section>

//       <div>
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L12.6,186.7C25.3,181,51,171,76,160C101.1,149,126,139,152,149.3C176.8,160,202,192,227,208C252.6,224,278,224,303,218.7C328.4,213,354,203,379,192C404.2,181,429,171,455,149.3C480,128,505,96,531,101.3C555.8,107,581,149,606,149.3C631.6,149,657,107,682,96C707.4,85,733,107,758,117.3C783.2,128,808,128,834,154.7C858.9,181,884,235,909,245.3C934.7,256,960,224,985,224C1010.5,224,1036,256,1061,261.3C1086.3,267,1112,245,1137,229.3C1162.1,213,1187,203,1213,176C1237.9,149,1263,107,1288,117.3C1313.7,128,1339,192,1364,192C1389.5,192,1415,128,1427,96L1440,64L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"></path></svg>
//       </div>
//     </div>
//   );
// }





import React from "react";
import { motion } from "framer-motion"; // Note: You'll need to install framer-motion

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <section className="container mx-auto px-4 md:px-20 py-16 flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            Delicious Food
            <span className="block text-blue-600">At Your Doorstep</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Discover the best foods from over 1,000 restaurants and fast delivery to your doorstep
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full 
            transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Order Now
          </button>
        </motion.div>

        {/* Right side */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-full blur-xl opacity-30"></div>
            <img
              className="relative rounded-3xl shadow-2xl hover:scale-105 transition duration-500 w-full max-w-lg mx-auto"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Delicious Food"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Delivery",
                description: "Get your food delivered within 30 minutes",
                icon: "🚀"
              },
              {
                title: "Quality Food",
                description: "We provide high quality and fresh food",
                icon: "⭐"
              },
              {
                title: "Best Offers",
                description: "Get exciting offers and discounts",
                icon: "💰"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition duration-300 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6">
                Welcome to our Food App, where passion for food meets convenience. We started our journey in 2023 with a simple mission: to connect food lovers with their favorite restaurants and deliver delicious meals right to their doorstep.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our team of food enthusiasts works tirelessly to ensure that you get the best culinary experience. We partner with top-rated restaurants to bring you a diverse range of cuisines, from local favorites to international delights.
              </p>
              <p className="text-lg text-gray-700">
                What sets us apart is our commitment to quality, speed, and customer satisfaction. We believe that good food should be accessible to everyone, and we're here to make that happen.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <span className="mr-2">📍</span> 123 Food Street, Cuisine City
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">📞</span> +1 (555) 123-4567
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">✉️</span> support@foodapp.com
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">⏰</span> Mon-Sun: 8:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Your Message" 
                      rows="4" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wave SVG */}
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,192L12.6,186.7C25.3,181,51,171,76,160C101.1,149,126,139,152,149.3C176.8,160,202,192,227,208C252.6,224,278,224,303,218.7C328.4,213,354,203,379,192C404.2,181,429,171,455,149.3C480,128,505,96,531,101.3C555.8,107,581,149,606,149.3C631.6,149,657,107,682,96C707.4,85,733,107,758,117.3C783.2,128,808,128,834,154.7C858.9,181,884,235,909,245.3C934.7,256,960,224,985,224C1010.5,224,1036,256,1061,261.3C1086.3,267,1112,245,1137,229.3C1162.1,213,1187,203,1213,176C1237.9,149,1263,107,1288,117.3C1313.7,128,1339,192,1364,192C1389.5,192,1415,128,1427,96L1440,64L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"
          ></path>
        </svg>
      </div>




      

    </div>
  );
}