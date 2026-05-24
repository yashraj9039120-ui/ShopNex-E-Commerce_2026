import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageTitle from "../../service/page/PageTitle";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Navbar";
import Loader from "../../shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  removeErrors,
  removeSuccess,
} from "../../redux/order/orderSlice";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/cart/cartSlice";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { loading, success, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrderData = async () => {
      try {
        const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));
        if (!orderItem) return;

        const orderData = {
          shippingInfo: {
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            country: shippingInfo.country,
            pinCode: shippingInfo.pinCode,
            phoneNo: shippingInfo.phoneNumber,
          },
          orderItems: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            product: item.product,
          })),
          paymentInfo: {
            id: reference,
            status: "succeeded",
          },
          itemPrice: orderItem.subtotal,
          taxPrice: orderItem.tax,
          shippingPrice: orderItem.shippingCharges,
          totalPrice: orderItem.total,
        };

        dispatch(createOrder(orderData));
        sessionStorage.removeItem("orderItem");
      } catch (error) {
        toast.error(error.message || "Order Creation Error", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    };
    createOrderData();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success("Order Placed", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(clearCart());
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Payment Status" />
          <Navbar />

          {/* Container */}
          <div className="flex flex-col items-center justify-center h-screen text-center px-6 font-sans">
            <div className="flex flex-col items-center justify-center">
              {/* Success Icon */}
              <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center mb-4 relative">
                <div className="w-5 h-10 border-r-[6px] border-b-[6px] border-white rotate-45 absolute bottom-[18px] left-[28px]" />
              </div>

              {/* Heading */}
              <h1 className="text-3xl font-semibold text-green-600 mb-2">
                Order Confirmed!
              </h1>

              {/* Reference text */}
              <p className="text-gray-600 text-base mt-4">
                Your payment was successful. Reference ID{" "}
                <strong>{reference}</strong>
              </p>

              {/* CTA */}
              <Link
                className="mt-6 px-6 py-2 rounded-md bg-blue-600 text-white text-base font-medium hover:bg-blue-700 transition"
                to="/orders/user"
              >
                View Orders
              </Link>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default PaymentSuccess;
