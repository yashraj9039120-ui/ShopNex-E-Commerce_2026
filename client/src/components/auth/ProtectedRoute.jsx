
// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
// import Loader from "../../shared/Loader";

// function ProtectedRoute({ children, adminOnly = false }) {
//   const { isAuthenticated, loading, user } = useSelector((state) => state.user);

//   if (loading) {
//     return <Loader />;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (adminOnly && user?.role !== "admin") {
//     return <Navigate to="/" replace />;
//   }

//   // Render children if passed, otherwise render nested routes
//   return children ? children : <Outlet />;
// }

// export default ProtectedRoute;



import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../shared/Loader";

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (adminOnly && user?.role !== "admin") return <Navigate to="/" replace />;

  return children || <Outlet />;
}

export default ProtectedRoute;
