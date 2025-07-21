import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");

  if (!token || !admin) {
    return <Navigate to="/login" />;
  }

  return children;
}
