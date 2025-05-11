import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
export default RequireAuth;
