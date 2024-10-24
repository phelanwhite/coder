import { useAuthStore } from "@/stores/auth-store";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const AuthProtectedRouter = () => {
  const { user } = useAuthStore();

  return user ? <Outlet /> : <Navigate to={`/`} />;
};

export default memo(AuthProtectedRouter);
