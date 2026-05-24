import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/user/userSlice";

// Pages & Components
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/auth/UpdatePassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import OrderConfirm from "./components/cart/OrderConfirm";
import Payment from "./components/cart/Payment";
import About from "./components/home/About";
import PaymentSuccess from "./components/cart/PaymentSuccess";
import MyOrders from "./components/orders/MyOrders";
import OrderDetails from "./components/orders/OrderDetails";

// Admin Components
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import CreateProduct from "./components/admin/CreateProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import UsersList from "./components/admin/UsersList";
import UpdateRole from "./components/admin/UpdateRole";
import OrdersList from "./components/admin/OrdersList";
import UpdateOrder from "./components/admin/UpdateOrder";
import ReviewsList from "./components/admin/ReviewsList";

import NotFound from "./shared/Notfound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotProtectedLayout from "./components/auth/NotProtectedRoute";
import UserDashboard from "./components/user/UserDashboard";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes element={<NotProtectedLayout/>}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/about-us" element={<About/>}/>

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<OrderConfirm />} />
          <Route path="/process/payment" element={<Payment />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/orders/user" element={<MyOrders />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
        
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsList />} />
          <Route path="/admin/product/create" element={<CreateProduct />} />
          <Route path="/admin/product/:updateId" element={<UpdateProduct />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/user/:userId" element={<UpdateRole />} />
          <Route path="/admin/orders" element={<OrdersList />} />
          <Route path="/admin/order/:orderId" element={<UpdateOrder />} />
          <Route path="/admin/reviews" element={<ReviewsList />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Optional User Dashboard */}
      {isAuthenticated && <UserDashboard user={user} />}
    </Router>
  );
}

export default App;



// // src/App.jsx or wherever your router is defined
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Maintenance from "./router/Maintenance";

// function App() {
//   const isMaintenanceMode = true; // toggle this to enable/disable maintenance

//   return (
//     <Router>
//       <Routes>
//         {isMaintenanceMode ? (
//           <Route path="*" element={<Maintenance />} />
//         ) : (
//           <>
//             <Route path="/" element={<Home />} />
//             {/* Other routes go here */}
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
