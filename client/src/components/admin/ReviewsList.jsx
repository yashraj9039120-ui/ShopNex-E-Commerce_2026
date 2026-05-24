import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar";
import PageTitle from "../../service/page/PageTitle";
import Footer from "../../components/home/Footer";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteReview,
  fetchAdminProducts,
  fetchProductReviews,
  removeErrors,
  removeSuccess,
} from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";
import { useNavigate } from "react-router-dom";

function ReviewsList() {
  const { products, loading, error, reviews, success, message } = useSelector(
    (state) => state.admin
  );
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleViewReviews = (productId) => {
    setSelectedProduct(productId);
    dispatch(fetchProductReviews(productId));
  };

  const handleDeleteReview = (productId, reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (confirmDelete) {
      dispatch(deleteReview({ productId, reviewId }));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      navigate("/admin/products");
    }
  }, [dispatch, error, success, message, navigate]);

  if (!products || products.length === 0) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Admin Reviews
        </h1>
        <p className="text-gray-500">No Product Found</p>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="All Reviews" />
          <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              All Products
            </h1>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
              <table className="min-w-full border-collapse">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    {[
                      "Sl No",
                      "Product Name",
                      "Product Image",
                      "Number of Reviews",
                      "Action",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-4 py-3 text-left text-sm font-semibold tracking-wide"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-indigo-50 transition`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-4 py-3">
                        <img
                          src={product.image[0]?.url}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {product.numOfReviews}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {product.numOfReviews > 0 ? (
                          <button
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
                            onClick={() => handleViewReviews(product._id)}
                          >
                            View Reviews
                          </button>
                        ) : (
                          <span className="text-gray-400">No reviews</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reviews Details */}
            {selectedProduct && reviews && reviews.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Reviews for Product
                </h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
                  <table className="min-w-full border-collapse">
                    <thead className="bg-indigo-600 text-white">
                      <tr>
                        {[
                          "Sl No",
                          "Reviewer Name",
                          "Rating",
                          "Comment",
                          "Action",
                        ].map((head) => (
                          <th
                            key={head}
                            className="px-4 py-3 text-left text-sm font-semibold tracking-wide"
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review, index) => (
                        <tr
                          key={review._id}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-red-50 transition`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">
                            {review.name}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-yellow-500">
                            {review.rating} ★
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {review.comment}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              className="p-2 text-red-600 rounded hover:bg-red-100 transition"
                              onClick={() =>
                                handleDeleteReview(selectedProduct, review._id)
                              }
                            >
                              <Delete fontSize="small" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ReviewsList;
