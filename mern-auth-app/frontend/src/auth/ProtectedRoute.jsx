import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If the user is authenticated, render the children component
  if (isAuthenticated) return children;

  // If not authenticated, redirect to the login page
  return (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default ProtectedRoute;