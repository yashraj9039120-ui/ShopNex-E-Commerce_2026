import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar";
import PageTitle from "../../service/page/PageTitle";
import Footer from "../../components/home/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../redux/order/orderSlice";
import Loader from "../../shared/Loader";
import { toast } from "react-toastify";
import {
  removeErrors,
  removeSuccess,
  updateOrderStatus,
} from "../../redux/admin/adminSlice";

function UpdateOrder() {
  const [status, setStatus] = useState("");
  const { orderId } = useParams();
  const { order, loading: orderLoading } = useSelector((state) => state.order);
  const { success, loading: adminLoading, error } = useSelector(
    (state) => state.admin
  );
  const loading = orderLoading || adminLoading;
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    orderStatus,
    totalPrice,
  } = order;

  const paymentStatus =
    paymentInfo.status === "succeeded" ? "Paid" : "Not Paid";
  const finalOrderStatus =
    paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;

  const handleStatusUpdate = () => {
    if (!status) {
      toast.error("Please select a status", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(updateOrderStatus({ orderId, status }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("Order Status updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, error, success, orderId]);

  return (
    <>
      <Navbar />
      <PageTitle title="Update Order" />
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-6xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Update Order
          </h1>

          {/* Order Info */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Order Information
            </h2>
            <p className="text-gray-600">
              <strong>Order ID:</strong> {orderId}
            </p>
            <p className="text-gray-600">
              <strong>Shipping Address:</strong> {shippingInfo.address},{" "}
              {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} -{" "}
              {shippingInfo.pinCode}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {shippingInfo.phoneNo}
            </p>
            <p className="text-gray-600">
              <strong>Order Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  finalOrderStatus === "Delivered"
                    ? "bg-green-600"
                    : finalOrderStatus === "Cancelled"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {finalOrderStatus}
              </span>
            </p>
            <p className="text-gray-600">
              <strong>Payment Status:</strong> {paymentStatus}
            </p>
            <p className="text-gray-600">
              <strong>Total Price:</strong> ₹{totalPrice}
            </p>
          </div>

          {/* Order Items */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Order Items
            </h2>
            <table className="w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 border text-gray-700">Image</th>
                  <th className="px-4 py-3 border text-gray-700">Name</th>
                  <th className="px-4 py-3 border text-gray-700">Quantity</th>
                  <th className="px-4 py-3 border text-gray-700">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3 border">{item.name}</td>
                    <td className="px-4 py-3 border">{item.quantity}</td>
                    <td className="px-4 py-3 border">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Update Status */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Update Status
            </h2>
            <select
              className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading || orderStatus === "Delivered"}
            >
              <option value="">Select Status</option>
              <option value="Shipped">Shipped</option>
              <option value="On The Way">On The Way</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={loading || !status || orderStatus === "Delivered"}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Update Status
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default UpdateOrder;
