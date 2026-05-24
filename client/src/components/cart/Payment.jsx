// import React from "react";
// import PageTitle from "../components/PageTitle";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import CheckoutPath from "./CheckoutPath";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// function Payment() {
//   const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
//   const { user } = useSelector((state) => state.user);
//   const { shippingInfo } = useSelector((state) => state.cart);
//   const navigate = useNavigate();

//   const completePayment = async (amount) => {
//     try {
//       const { data: keyData } = await axios.get("/api/v1/getKey");
//       const { key } = keyData;

//       const { data: orderData } = await axios.post("/api/v1/payment/process", {
//         amount,
//       });
//       const { order } = orderData;

//       const options = {
//         key,
//         amount,
//         currency: "INR",
//         name: "ShopEasy",
//         description: "Ecommerce Website Payment Transaction",
//         order_id: order.id,
//         handler: async function (response) {
//           const { data } = await axios.post("/api/v1/paymentVerification", {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           });
//           if (data.success) {
//             navigate(`/paymentSuccess?reference=${data.reference}`);
//           } else {
//             alert("Payment verification Failed");
//           }
//         },
//         prefill: {
//           name: user.name,
//           email: user.email,
//           contact: shippingInfo.phoneNumber,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       toast.error(error.message, { position: "top-center", autoClose: 3000 });
//     }
//   };

//   return (
//     <>
//       <PageTitle title="Payment Processing" />
//       <Navbar />
//       <CheckoutPath activePath={2} />

//       {/* Container */}
//       <div className="h-[40vh] flex flex-col justify-center items-center gap-4 md:flex-row md:gap-8">
//         <Link
//           to="/order/confirm"
//           className="px-6 py-2 text-base rounded-md border border-gray-500 text-gray-600 bg-gray-100 hover:bg-gray-600 hover:text-white transition"
//         >
//           Go Back
//         </Link>

//         <button
//           className="px-6 py-2 text-base rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition"
//           onClick={() => completePayment(orderItem.total)}
//         >
//           Pay ({orderItem.total})/-
//         </button>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Payment;


import React, { useEffect } from "react";
import PageTitle from "../../service/page/PageTitle";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import CheckoutPath from "../cart/CheckoutPath";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Payment() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);

  // Safely parse orderItem
  const orderItem = JSON.parse(sessionStorage.getItem("orderItem") || "null");

  // Redirect if orderItem is missing
  useEffect(() => {
    if (!orderItem) {
      toast.error("No order found. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/cart"); // or /order/confirm depending on your flow
    }
  }, [orderItem, navigate]);

  const completePayment = async (amount) => {
    try {
      const { data: keyData } = await axios.get("/api/v1/getKey",{
         withCredentials: true,
      });
      const { key } = keyData;

      const { data: orderData } = await axios.post("/api/v1/payment/process", {
        amount,
      },
     { withCredentials: true });
      const { order } = orderData;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "ShopEasy",
        description: "Ecommerce Website Payment Transaction",
        order_id: order.id,
        handler: async function (response) {
          try {
            const { data } = await axios.post("/api/v1/paymentVerification", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (data.success) {
              navigate(`/paymentSuccess?reference=${data.reference}`);
            } else {
              toast.error("Payment verification failed", {
                position: "top-center",
                autoClose: 3000,
              });
            }
          } catch (err) {
            toast.error("Error verifying payment", {
              position: "top-center",
              autoClose: 3000,
            });
          }
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact: shippingInfo?.phoneNumber || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />
      <CheckoutPath activePath={2} />

      {/* Container */}
      <div className="h-[40vh] flex flex-col justify-center items-center gap-4 md:flex-row md:gap-8">
        <Link
          to="/order/confirm"
          className="px-6 py-2 text-base rounded-md border border-gray-500 text-gray-600 bg-gray-100 hover:bg-gray-600 hover:text-white transition"
        >
          Go Back
        </Link>

        <button
          disabled={!orderItem?.total}
          className={`px-6 py-2 text-base rounded-md text-white font-medium shadow transition ${
            orderItem?.total
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => orderItem?.total && completePayment(orderItem.total)}
        >
          Pay ({orderItem?.total || 0})/-
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Payment;
