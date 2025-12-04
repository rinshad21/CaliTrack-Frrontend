import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ children }:any) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoutes;