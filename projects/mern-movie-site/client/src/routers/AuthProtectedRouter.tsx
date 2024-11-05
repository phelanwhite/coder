import { useAuthStore } from "@/stores/auth-store";
import React, { memo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthProtectedRouter = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated)
    return <Navigate to={`/signin`} state={{ from: location }} />;

  return <Outlet />;
};

export default memo(AuthProtectedRouter);
