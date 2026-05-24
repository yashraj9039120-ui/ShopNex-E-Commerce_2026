import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 bg-amber-50 text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-cyan-700 mb-4"
        >
          About <span className="text-gray-900">ShopNex</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
        >
          ShopNex is a next-generation smart marketplace built to empower users with intelligent shopping, seamless experience, and cutting-edge technology.
          Our mission is to redefine how people connect with products — blending innovation, AI, and simplicity in every interaction.
        </motion.p>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-8 border border-cyan-100"
        >
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4">🎯 Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To build a smarter and more personalized online marketplace using AI-powered recommendations, ensuring every customer finds what they truly need — effortlessly and intuitively.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-2xl p-8 border border-cyan-100"
        >
          <h2 className="text-2xl font-semibold text-cyan-700 mb-4">💡 Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To be the global leader in AI-driven eCommerce, providing intelligent, secure, and user-friendly experiences that inspire trust, innovation, and sustainability.
          </p>
        </motion.div>
      </section>

      {/* Values / Highlights */}
      <section className="bg-cyan-700 text-white py-16 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "AI-Driven Insights",
              desc: "Personalized recommendations that adapt to your shopping style.",
            },
            {
              title: "Secure & Reliable",
              desc: "Your data and transactions are protected with top-tier security.",
            },
            {
              title: "Sustainability",
              desc: "We believe in ethical commerce and eco-friendly business practices.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 p-6 rounded-2xl backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-cyan-100 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / Contact Info */}
      <footer className="text-center py-10 text-gray-600">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-cyan-700">ShopNex</span>. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built with ❤️ by the ShopNex Development Team
        </p>
      </footer>
    </div>
  );
};

export default About;
