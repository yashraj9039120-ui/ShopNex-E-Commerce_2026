// import { motion } from 'framer-motion';
// import React from 'react';
// import { FaExclamationTriangle } from 'react-icons/fa'; // Example icon
// import { Link } from 'react-router-dom';

// const NotFound = () => {
//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
//       {/* Background container around content */}
//       <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center space-y-6">
//         {/* Main Animation with Icon */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <FaExclamationTriangle className="text-8xl mb-4 animate-bounce" />
//         </motion.div>

//         <motion.h1
//           className="text-6xl font-bold text-gray-900"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           404
//         </motion.h1>

//         {/* Text Animation */}
//         <motion.p
//           className="text-xl font-medium text-gray-700"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.5 }}
//         >
//           Oops! The page you're looking for doesn't exist.
//         </motion.p>

        

//         {/* Button Animation */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, delay: 1.5 }}
//         >
//           <Link
//             to="/"
//             className="inline-block mt-6 px-8 py-3 bg-indigo-500 text-white rounded-lg text-lg transition-transform transform hover:scale-105"
//           >
//             Go Back to Home
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default NotFound;




import { motion } from 'framer-motion';
import React from 'react';
import { FaRocket } from 'react-icons/fa'; // Fun rocket icon for coming soon
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center space-y-6 relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        {/* Rocket Icon */}
        <motion.div
          initial={{ opacity: 0, y: -50, rotate: -15 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1 }}
        >
          <FaRocket className="text-7xl text-indigo-500 mx-auto animate-bounce" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl font-extrabold text-gray-900"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Coming Soon!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-lg text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          We're launching something awesome soon. Stay tuned for updates!
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link
            to="/"
            className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg text-lg shadow-lg hover:scale-105 transition-transform transform"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
