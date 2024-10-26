import { useAuthStore } from "@/stores/auth-store";
import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthProtected = () => {
  const { isAuthenticated } = useAuthStore();
  return <div>{isAuthenticated ? <Outlet /> : <Navigate to={`/`} />}</div>;
};

export default memo(AuthProtected);
