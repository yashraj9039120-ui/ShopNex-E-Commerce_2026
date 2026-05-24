// // src/pages/Maintenance.jsx
// import React, { useState, useEffect } from "react";

// const MAINTENANCE_DEADLINE = new Date("2025-09-25T03:07:00");

// function getRemainingTime(deadline) {
//   const total = deadline - new Date();
//   const seconds = Math.floor((total / 1000) % 60);
//   const minutes = Math.floor((total / 1000 / 60) % 60);
//   const hours = Math.floor(total / (1000 * 60 * 60));
//   return {
//     total,
//     hours: Math.max(0, hours),
//     minutes: Math.max(0, minutes),
//     seconds: Math.max(0, seconds),
//   };
// }

// const Maintenance = () => {
//   const [timeLeft, setTimeLeft] = useState(getRemainingTime(MAINTENANCE_DEADLINE));

//   useEffect(() => {
//     const timerId = setInterval(() => setTimeLeft(getRemainingTime(MAINTENANCE_DEADLINE)), 1000);
//     return () => clearInterval(timerId);
//   }, []);

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-700 to-indigo-500 overflow-hidden px-4">
//       {/* Floating background circles */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full filter blur-lg animate-float"></div>
//       <div className="absolute bottom-0 right-0 w-36 h-36 bg-purple-600/20 rounded-full filter blur-lg animate-float-reverse"></div>

//       {/* Main card */}
//       <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full text-center p-10 md:p-12">
//         {/* Spinning Icon */}
//         <div className="mb-7 flex justify-center">
//           <svg
//             width="76"
//             height="76"
//             viewBox="0 0 64 64"
//             className="animate-spin drop-shadow-lg"
//           >
//             <circle cx="32" cy="32" r="28" stroke="#764ba2" strokeWidth="3" />
//             <path d="M32 14v12" stroke="#667eea" strokeWidth="2" strokeLinecap="round" />
//             <path d="M32 52v-12" stroke="#667eea" strokeWidth="2" strokeLinecap="round" />
//             <path d="M50 32h-12" stroke="#667eea" strokeWidth="2" strokeLinecap="round" />
//             <path d="M14 32h12" stroke="#667eea" strokeWidth="2" strokeLinecap="round" />
//           </svg>
//         </div>

//         {/* Heading */}
//         <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-4">
//           We'll be back soon!
//         </h1>
//         <p className="text-base md:text-lg text-indigo-700 mb-8 leading-relaxed">
//           Our site is undergoing scheduled maintenance. <br />
//           Please check back soon for new features and improvements.
//         </p>

//         {/* Countdown Timer */}
//         <div className="text-xl font-bold text-purple-700 mb-6">
//           {timeLeft.total > 0
//             ? `Estimated wait: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
//             : "We're back online!"}
//         </div>

//         {/* Notify Button */}
//         <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full shadow-md hover:brightness-110 transition mb-4">
//           Notify Me
//         </button>

//         <p className="text-sm text-indigo-500">
//           Want updates? Enter your email at sign up. We'll notify when we’re back online.
//         </p>
//       </div>

//       {/* Tailwind Animations */}
//       <style>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-16px); }
//         }
//         @keyframes float-reverse {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(16px); }
//         }
//         .animate-float { animation: float 6s ease-in-out infinite; }
//         .animate-float-reverse { animation: float-reverse 6s ease-in-out infinite; }
//       `}</style>
//     </div>
//   );
// };

// export default Maintenance;
