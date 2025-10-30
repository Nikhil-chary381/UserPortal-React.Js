
import { Navigate } from "react-router-dom";
import authService from "../components/authService";

export default function PrivateRoute({ children }) {
  const user = authService.getCurrentUser();
  return user ? children : <Navigate to="/login" />;
}
