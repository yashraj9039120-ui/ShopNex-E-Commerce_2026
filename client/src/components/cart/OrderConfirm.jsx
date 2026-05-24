import React from "react";
import PageTitle from "../../service/page/PageTitle";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import CheckoutPath from "../cart/CheckoutPath";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderConfirm = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const shippingCharges = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shippingCharges;

  const navigate = useNavigate();

  const proceedToPayment = () => {
    const data = { subtotal, tax, shippingCharges, total };
    sessionStorage.setItem("orderItem", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
      <PageTitle title="Order Confirm" />
      <Navbar />
      <CheckoutPath activePath={1} />

      <div className="max-w-6xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-10">Order Confirmation</h1>

        <div className="space-y-12">
          {/* Shipping Details */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">Shipping Details</h2>
            <table className="w-full table-fixed border-collapse rounded-xl shadow-md bg-white">
              <thead>
                <tr>
                  <th className="bg-gray-100 border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Name</th>
                  <th className="bg-gray-100 border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Phone</th>
                  <th className="bg-gray-100 border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm text-gray-700 hover:bg-indigo-50 transition">
                  <td className="border border-gray-300 px-6 py-3">{user.name}</td>
                  <td className="border border-gray-300 px-6 py-3">{shippingInfo.phoneNumber}</td>
                  <td className="border border-gray-300 px-6 py-3">
                    {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pinCode}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Cart Items */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">Cart Items</h2>
            <table className="w-full table-fixed border-collapse rounded-xl shadow-md bg-white">
              <thead>
                <tr>
                  <th className="bg-gray-100 border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Image</th>
                  <th className="bg-gray-100 border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Product</th>
                  <th className="bg-gray-100 border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Price</th>
                  <th className="bg-gray-100 border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Quantity</th>
                  <th className="bg-gray-100 border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product} className="text-sm text-gray-700 hover:bg-indigo-50 transition">
                    <td className="border border-gray-300 px-4 py-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-3">₹{item.price}</td>
                    <td className="border border-gray-300 px-4 py-3">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-3">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Order Summary */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">Order Summary</h2>
            <table className="w-full table-fixed border-collapse rounded-xl shadow-md bg-white">
              <thead>
                <tr>
                  <th className="bg-gray-100 border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Subtotal</th>
                  <th className="bg-gray-100 border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Shipping</th>
                  <th className="bg-gray-100 border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">GST</th>
                  <th className="bg-gray-100 border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm text-gray-700 hover:bg-indigo-50 transition">
                  <td className="border border-gray-300 px-6 py-3">₹{subtotal.toFixed(2)}</td>
                  <td className="border border-gray-300 px-6 py-3">{shippingCharges === 0 ? "Free" : `₹${shippingCharges.toFixed(2)}`}</td>
                  <td className="border border-gray-300 px-6 py-3">₹{tax.toFixed(2)}</td>
                  <td className="border border-gray-300 px-6 py-3 font-semibold text-gray-900">₹{total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <button
          onClick={proceedToPayment}
          className="block mx-auto mt-8 px-10 py-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl shadow-lg transition transform hover:-translate-y-1"
        >
          Proceed to Payment
        </button>
      </div>

      <Footer />
    </>
  );
};

export default OrderConfirm;
