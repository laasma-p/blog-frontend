import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  } else {
    return Children;
  }
};

export default ProtectedRoute;
