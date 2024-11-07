import React, { memo } from "react";
import SidebarRight from "./SidebarRight";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex max-w-[1332px] w-full mx-auto px-3 ">
      {/* Left  */}
      <div className="flex-1">
        <Outlet />
      </div>
      {/* Right  */}
      <SidebarRight />
    </div>
  );
};

export default memo(AuthLayout);
