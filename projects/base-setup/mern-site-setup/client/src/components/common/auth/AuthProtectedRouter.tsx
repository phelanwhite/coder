import useSigninRedirect from "@/hooks/useSigninRedirect";
import { useAuthStore } from "@/stores/auth-store";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthProtectedRouter = () => {
  const { isLoggedIn } = useAuthStore();
  const { handleSaveStateRedirect } = useSigninRedirect();
  useEffect(() => {
    if (!isLoggedIn) {
      handleSaveStateRedirect();
    }
  }, [isLoggedIn, location]);

  if (!isLoggedIn) return <Navigate to={`/signin`} />;

  return <Outlet />;
};

export default AuthProtectedRouter;
