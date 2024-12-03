import { useAuthStore } from "@/stores/auth-store";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthProtectedRouter = () => {
  const { isLoggedIn, changeRedirectUrl } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      changeRedirectUrl(location);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Navigate to={`/signin`} />;

  return <Outlet />;
};

export default AuthProtectedRouter;
