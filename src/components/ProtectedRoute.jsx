import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
