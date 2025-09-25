// Component/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useStaffstore } from "../Store/staffStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useStaffstore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
