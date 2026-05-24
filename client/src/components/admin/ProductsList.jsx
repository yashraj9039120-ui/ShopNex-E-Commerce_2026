import React, { useEffect } from "react";
import Navbar from "../../components/home/Navbar";
import PageTitle from "../../service/page/PageTitle";
import Footer from "../../components/home/Footer";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts,
  removeErrors,
  removeSuccess,
} from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";

// Small spinner for buttons
const ButtonLoader = () => (
  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
);

function ProductsList() {
  const { products, loading, error, deleting } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handleDelete = (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      dispatch(deleteProduct(productId)).then((action) => {
        if (action.type === "admin/deleteProduct/fulfilled") {
          toast.success("Product Deleted Successfully", {
            position: "top-center",
            autoClose: 3000,
          });
          dispatch(fetchAdminProducts()); // Refresh list
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow min-h-screen mt-24 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Admin Products
        </h1>
        <p className="text-gray-500 text-lg">No Products Found</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <PageTitle title="All Products" />
      <div className="p-6 bg-gray-100 rounded-lg shadow min-h-screen mt-24">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>

        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse bg-white">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {[
                  "Sl No",
                  "Product Image",
                  "Product Name",
                  "Price",
                  "Ratings",
                  "Category",
                  "Stock",
                  "Created At",
                  "Actions",
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
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-indigo-50 transition`}
                >
                  <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={product.image[0]?.url}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">₹{product.price}</td>
                  <td className="px-4 py-3 text-sm text-yellow-500 font-semibold">
                    {product.ratings} ★
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{product.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{product.stock}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(product.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm flex gap-3">
                    <Link
                      to={`/admin/product/${product._id}`}
                      className="p-2 text-indigo-600 rounded hover:bg-indigo-100 transition"
                    >
                      <Edit fontSize="small" />
                    </Link>
                    <button
                      className="p-2 text-red-600 rounded hover:bg-red-100 transition flex items-center justify-center"
                      disabled={deleting[product._id]}
                      onClick={() => handleDelete(product._id)}
                    >
                      {deleting[product._id] ? <ButtonLoader /> : <Delete fontSize="small" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductsList;
