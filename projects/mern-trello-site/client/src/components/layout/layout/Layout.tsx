import React, { memo } from "react";
import SidebarLeft from "../sidebar/SidebarLeft";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex ">
      <section>
        <SidebarLeft />
      </section>
      <section className="flex-1 overflow-auto p-3">
        {/* Content goes here */}
        <Outlet />
      </section>
    </div>
  );
};

export default memo(Layout);
