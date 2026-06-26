import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
}
