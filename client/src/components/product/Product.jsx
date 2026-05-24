import React from "react";
import { Link } from "react-router-dom";
import Rating from "../user/Rating";

function Product({ product }) {
  const imageUrl = product.image && product.image[0] && product.image[0].url 
    ? product.image[0].url 
    : "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <Link
      to={`/product/${product._id}`}
      className="block text-inherit no-underline group"
    >
      <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
        
        {/* Product Image */}
        <div className="h-52 bg-gray-50 flex items-center justify-center p-4 border-b">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
            }}
          />
        </div>

        {/* Product Details */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-3 min-h-[3.2rem]">
            {product.name}
          </h3>

          <p className="text-indigo-600 font-bold text-xl mb-3">
            ₹{product.price}/-
          </p>

          {/* Ratings */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <Rating value={product.ratings || 0} disabled={true} />
            <span className="text-gray-500 text-sm">
              ({product.numOfReviews || 0})
            </span>
          </div>

          <button className="mt-auto w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Product;