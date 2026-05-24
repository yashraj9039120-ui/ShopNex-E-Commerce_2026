import React, { useEffect } from "react";
import Navbar from "../../components/home/Navbar";
import PageTitle from "../../service/page/PageTitle";
import Footer from "../../components/home/Footer";
import Loader from "../../shared/Loader";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteOrder,
  fetchAllOrders,
  removeErrors,
  removeSuccess,
} from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";

function OrdersList() {
  const { orders, loading, error, success, message } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmDelete) {
      dispatch(deleteOrder(id));
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
      dispatch(fetchAllOrders());
    }
  }, [dispatch, error, success, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="All Orders" />

          <div className="p-6 bg-gray-100 rounded-lg shadow-md min-h-[70vh] mt-16 max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-5 text-gray-800">
              All Orders
            </h1>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="text-left px-4 py-3">Sl No</th>
                    <th className="text-left px-4 py-3">Order ID</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Total Price</th>
                    <th className="text-left px-4 py-3">Number Of Items</th>
                    <th className="text-left px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.length > 0 ? (
                    orders.map((order, index) => (
                      <tr
                        key={order._id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{order._id}</td>
                        <td
                          className={`px-4 py-2 font-medium rounded ${
                            order.orderStatus.toLowerCase() === "processing"
                              ? "bg-red-100 text-red-600"
                              : order.orderStatus.toLowerCase() === "delivered"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {order.orderStatus}
                        </td>
                        <td className="px-4 py-2">
                          ₹{order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-2">{order.orderItems.length}</td>
                        <td className="px-4 py-2 flex items-center space-x-3">
                          <Link
                            to={`/admin/order/${order._id}`}
                            className="text-blue-600 hover:bg-blue-100 p-2 rounded transition"
                          >
                            <Edit />
                          </Link>
                          <button
                            className="text-red-500 hover:bg-red-100 p-2 rounded transition"
                            onClick={() => handleDelete(order._id)}
                          >
                            <Delete />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-gray-500 py-6 font-medium"
                      >
                        🚫 No Orders Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default OrdersList;
