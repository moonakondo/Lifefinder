import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const NonRequireAuth = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate state={{ from: location }} replace />;
  }
  return children;
};

export default NonRequireAuth;
