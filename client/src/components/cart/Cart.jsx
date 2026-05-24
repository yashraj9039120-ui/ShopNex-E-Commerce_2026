// import React from 'react'
// import '../CartStyles/Cart.css'
// import PageTitle from '../components/PageTitle'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import CartItem from './CartItem'
// import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'

// function Cart() {
//     const {cartItems}=useSelector(state=>state.cart)
//     const subtotal=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
//     const tax=subtotal*0.18
//     const shippingCharges=subtotal>500?0:50
//     const total=subtotal+tax+shippingCharges;
//     const navigate=useNavigate();
//     const checkoutHandler=()=>{
//         navigate(`/login?redirect=/shipping`)
//     }
//   return (
//     <>
//      <Navbar/>
//      <PageTitle title="Your Cart"/>
//  {cartItems.length===0?(
//     <div className="empty-cart-container">
//         <p className="empty-cart-message">Your cart is empty</p>
//         <Link to="/products" className="viewProducts">View Products</Link>
//     </div>
//  ): (  <>
//     <div className="cart-page">
//         <div className="cart-items">
//             <div className="cart-items-heading">Your Cart</div>
//             <div className="cart-table">
//                 <div className="cart-table-header">
//                     <div className="header-product">Product</div>
//                     <div className="header-quantity">Quantity</div>
//                     <div className="header-total item-total-heading">Item Total</div>
//                     <div className="header-action">Actions</div>
//                 </div>

//                 {/* Cart Items */}
//                {cartItems && cartItems.map(item=><CartItem item={item} key={item.name}/>)}
//             </div>
//         </div>

//         {/* Price Summary */}
//         <div className="price-summary">
//             <h3 className="price-summary-heading">Price Summary</h3>
//             <div className="summary-item">
//                 <p className="summary-label">Subtotal :</p>
//                 <p className="summary-value">{subtotal}/-</p>
//             </div>
//             <div className="summary-item">
//                 <p className="summary-label">Tax (18%):</p>
//                 <p className="summary-value">{tax}/-</p>
//             </div>
//             <div className="summary-item">
//                 <p className="summary-label">Shipping :</p>
//                 <p className="summary-value">{shippingCharges}/-</p>
//             </div>
//             <div className="summary-total">
//                 <p className="total-label">Total :</p>
//                 <p className="total-value">{total}/-</p>
//             </div>
//             <button className="checkout-btn" onClick={checkoutHandler}>Proceed to Checkout</button>
//         </div>
//     </div>

  
//     </>)}
//     <Footer/>
//     </>
//   )
// }

// export default Cart



import React from "react";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import PageTitle from "../../service/page/PageTitle";
import CartItem from "../cart/CartItem";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const shippingCharges = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shippingCharges;

  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  };

  return (
    <>
      <Navbar />
      <PageTitle title="Your Cart" />

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 bg-gray-50 p-6 rounded-lg max-w-xl mx-auto shadow-md mt-10">
          <p className="text-2xl font-semibold text-gray-700">Your cart is empty</p>
          <Link
            to="/products"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            View Products
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 px-4 py-10 bg-gray-50 rounded-lg mt-10 shadow-lg">
          {/* Cart Items Section */}
          <section className="flex-1 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-3xl font-bold mb-6 border-b pb-3 border-gray-200">Your Cart</h2>
            <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-200">
              {cartItems.map((item) => (
                <CartItem item={item} key={item.product} />
              ))}
            </div>
          </section>

          {/* Price Summary Section */}
          <aside className="w-full max-w-md bg-white rounded-xl shadow-md p-8 sticky top-28 self-start h-fit">
            <h3 className="text-2xl font-semibold mb-8 border-b border-gray-200 pb-3">Price Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-700 text-lg">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 text-lg">
                <span>Tax (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 text-lg">
                <span>Shipping</span>
                <span>{shippingCharges === 0 ? "Free" : `₹${shippingCharges.toFixed(2)}`}</span>
              </div>

              <div className="border-t border-gray-300 pt-4 flex justify-between text-2xl font-extrabold text-gray-900">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button
                onClick={checkoutHandler}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-800 transition-all font-semibold mt-6 flex justify-center items-center gap-3"
              >
                Proceed to Checkout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </aside>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Cart;
