import React, { memo } from "react";
import { Outlet } from "react-router-dom";

const AuthProtectedLayout = () => {
  return (
    <div className="flex ">
      <div className="w-[250px] hidden"></div>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(AuthProtectedLayout);
