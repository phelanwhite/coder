import { useAuthStore } from "@/stores/auth-store";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthProtectedRouter = () => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname.includes(`signin`) ||
      location.pathname.includes(`signup`) ||
      location.pathname.includes(`forgot-password`) ||
      location.pathname.includes(`reset-password`)
    )
      return;
    if (!isLoggedIn) {
      localStorage.setItem("redirect_state", JSON.stringify(location));
    }
  }, [isLoggedIn, location]);

  if (!isLoggedIn) return <Navigate to={`/signin`} />;

  return <Outlet />;
};

export default AuthProtectedRouter;
