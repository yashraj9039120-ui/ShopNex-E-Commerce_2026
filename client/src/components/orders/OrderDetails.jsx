// import React, { useEffect } from "react";
// import "../OrderStyles/OrderDetails.css";
// import PageTitle from "../components/PageTitle";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrderDetails, removeErrors } from "../features/order/orderSlice";
// import Loader from "../shared/Loader";

// function OrderDetails() {
//   const { orderId } = useParams();
//   const { order, loading, error } = useSelector((state) => state.order);
  
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getOrderDetails(orderId));
//     if (error) {
//       toast.error(error, { position: "top-center", autoClose: 3000 });
//       dispatch(removeErrors());
//     }
//   }, [dispatch, error, orderId]);
// const {
//     shippingInfo={},
//     orderItems=[],
//     paymentInfo={},
//     orderStatus,
//     totalPrice,
//     taxPrice,
//     shippingPrice,
//     itemPrice,
//     paidAt
// }=order;
// const paymentStatus=paymentInfo?.status==='succeeded'?'Paid':'Not Paid'
// const finalOrderStatus=paymentStatus==='Not Paid'?'Cancelled':orderStatus;
// const orderStatusClass=finalOrderStatus==='Delivered'?'status-tag delivered':`status-tag ${finalOrderStatus.toLowerCase()}`;
// const paymentStatusClass=`pay-tag ${paymentStatus==='Paid'?'paid':'not-paid'}`
//   return (
//     <>
//       <PageTitle title={orderId} />
//       <Navbar />
//       {loading?(<Loader/>):(<div className="order-box">
//         {/* Order Items table */}
//         <div className="table-block">
//           <h2 className="table-title">Order Items</h2>
//           <table className="table-main">
//             <thead>
//               <tr>
//                 <th className="head-cell">Image</th>
//                 <th className="head-cell">Name</th>
//                 <th className="head-cell">Quantity</th>
//                 <th className="head-cell">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//              { orderItems.map((item)=>(
//                 <tr className="table-row">
//                 <td className="table-cell">
//                   <img src={item.image} alt={item.name} className="item-img" />
//                 </td>
//                 <td className="table-cell">{item.name} </td>
//                 <td className="table-cell">{item.quantity}</td>
//                 <td className="table-cell">{item.price}/-</td>
//               </tr>
//              ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Shipping Info Table */}
//         <div className="table-block">
//           <h2 className="table-title">Shipping Info</h2>
//           <table className="table-main">
//             <tbody>
//               <tr className="table-row">
//                 <th className="table-cell">Address</th>
//                 <td className="table-cell">
//                   {shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country}-{shippingInfo.pinCode}
//                 </td>
//               </tr>
//               <tr className="table-row">
//                 <th className="table-cell">Phone</th>
//                 <td className="table-cell">{shippingInfo.phoneNo}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Order Summary */}
//         <div className="table-block">
//           <h2 className="table-title">Order Summary</h2>
//           <table className="table-main">
//             <tbody>
//               <tr className="table-row">
//                 <th className="table-cell">Order Status</th>
//                 <td className="table-cell">
//                   <span className={orderStatusClass}>{finalOrderStatus}</span>
//                 </td>
//               </tr>
//               <tr className="table-row">
//                 <th className="table-cell">Payment</th>
//                 <td className="table-cell">
//                   <span className={paymentStatusClass}>{paymentStatus}</span>
//                 </td>
//               </tr>
//            {  paidAt && (<tr className="table-row">
//                 <th className="table-cell">Paid At</th>
//                 <td className="table-cell">{new Date(paidAt).toLocaleString()}</td>
//               </tr>)}
//               <tr className="table-row">
//                 <th className="table-cell">Items Price</th>
//                 <td className="table-cell">{itemPrice}/-</td>
//               </tr>
//               <tr className="table-row">
//                 <th className="table-cell">Tax Price</th>
//                 <td className="table-cell">{taxPrice}/-</td>
//               </tr>
//               <tr className="table-row">
//                 <th className="table-cell">Shipping Price</th>
//                 <td className="table-cell">{shippingPrice}/-</td>
//               </tr>
//               <tr className="table-row">
//                 <th className="table-cell">Total Price</th>
//                 <td className="table-cell">{totalPrice}/-</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>)}
//       <Footer />
//     </>
//   );
// }

// export default OrderDetails;


import React, { useEffect } from "react";
import PageTitle from "../../service/page/PageTitle";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, removeErrors } from "../../redux/order/orderSlice";
import Loader from "../../shared/Loader";
import { toast } from "react-toastify";

function OrderDetails() {
  const { orderId } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    orderStatus,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemPrice,
    paidAt,
  } = order || {};

  const paymentStatus = paymentInfo?.status === "succeeded" ? "Paid" : "Not Paid";
  const finalOrderStatus = paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;

  const statusColors = {
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    processing: "bg-yellow-100 text-yellow-700",
  };

  const orderStatusClass = statusColors[finalOrderStatus?.toLowerCase()] || "bg-gray-100 text-gray-700";
  const paymentStatusClass = paymentStatus === "Paid" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700";

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title={`Order Details - ${orderId}`} />
      <Navbar />

      <main className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
        <section className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <h1 className="text-center text-3xl font-bold text-gray-900 mb-10">Order Details</h1>

          {/* Order Items Table */}
          <div className="mb-12 overflow-x-auto rounded-lg border border-gray-200 shadow">
            <h2 className="text-xl font-semibold px-6 py-4 border-b border-gray-200 bg-gray-100">Order Items</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {["Image", "Name", "Quantity", "Price"].map((title) => (
                    <th
                      key={title}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <tr key={item._id || item.name} className="hover:bg-indigo-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Shipping Info */}
          <div className="mb-12 rounded-lg border border-gray-200 shadow bg-white p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-800">Shipping Info</h2>
            <p className="text-gray-700 mb-2">
              <strong>Address: </strong>
              {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pinCode}
            </p>
            <p className="text-gray-700">
              <strong>Phone: </strong> {shippingInfo.phoneNo}
            </p>
          </div>

          {/* Order Summary */}
          <div className="mb-12 rounded-lg border border-gray-200 shadow bg-white p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-800">Order Summary</h2>
            <div className="grid grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
              <span className="font-semibold">Order Status:</span>
              <span>
                <span className={`inline-block px-3 py-1 rounded-full font-semibold ${orderStatusClass}`}>
                  {finalOrderStatus || "N/A"}
                </span>
              </span>

              <span className="font-semibold">Payment:</span>
              <span>
                <span className={`inline-block px-3 py-1 rounded-full font-semibold ${paymentStatusClass}`}>
                  {paymentStatus}
                </span>
              </span>

              {paidAt && (
                <>
                  <span className="font-semibold">Paid At:</span>
                  <span>{new Date(paidAt).toLocaleString()}</span>
                </>
              )}

              <span className="font-semibold">Items Price:</span>
              <span>₹{itemPrice || 0}</span>

              <span className="font-semibold">Tax Price:</span>
              <span>₹{taxPrice || 0}</span>

              <span className="font-semibold">Shipping Price:</span>
              <span>₹{shippingPrice || 0}</span>

              <span className="font-semibold text-lg">Total Price:</span>
              <span className="font-bold text-lg">₹{totalPrice || 0}</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default OrderDetails;
