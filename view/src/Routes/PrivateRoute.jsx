import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Component for creating private routes that require authentication
const PrivateRoute = ({ children }) => {
  // Accessing the token and bookmarkedData from the Redux store
  const { token, bookmarkedData } = useSelector((store) => store.reducer);

  // If token is not available, redirect to the login page
  if (!token) {
    return <Navigate to="login" replace="true" />;
  }

  // Render the children components if the user is authenticated
  return children;
};

export default PrivateRoute;
