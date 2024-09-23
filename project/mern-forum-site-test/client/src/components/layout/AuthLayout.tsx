import { useAuthStore } from "@/store/auth-store";
import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useAuthStore();
  return (
    <div className="max-w-[1336px] mx-auto px-6">
      {user ? <Outlet /> : <Navigate to={`/signin`} />}
    </div>
  );
};

export default memo(AuthLayout);
