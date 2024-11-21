import React, { memo } from "react";
import { Outlet } from "react-router-dom";

const AuthProtectedLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default memo(AuthProtectedLayout);
