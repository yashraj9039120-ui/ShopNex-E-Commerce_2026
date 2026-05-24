import React from "react";
import { useNavigate } from "react-router-dom";

function NoProducts({ keyword }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4 sm:px-6">
      <div className="flex flex-col items-center text-center bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 sm:p-12 max-w-lg w-full">
        
        {/* Icon */}
        <div className="text-6xl sm:text-7xl mb-4 animate-bounce text-red-500">
          ⚠️
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          No Products Found
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          {keyword ? (
            <>
              We couldn’t find any products matching{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                "{keyword}"
              </span>
              . Try using different keywords or explore our catalog.
            </>
          ) : (
            "No products are available at the moment. Please check back later or browse our catalog."
          )}
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/products")}
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
        >
          Browse Catalog
        </button>
      </div>
    </div>
  );
}

export default NoProducts;
