import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedWithAuth = () => {
  const user = useSelector((state) => state.authSlice?.currentUser);
  return <div>{user ? <Outlet /> : <Navigate to={`/signin`} />}</div>;
};

export default memo(ProtectedWithAuth);
