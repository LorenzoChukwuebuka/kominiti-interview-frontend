import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (token === undefined) {
    // If token is still loading, return null or loading component
    return null; // Or return a loading component
  }

  return token ? <Outlet /> : <Navigate to="/" />;
};
