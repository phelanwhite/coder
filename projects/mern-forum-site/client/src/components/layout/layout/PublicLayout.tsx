import React, { memo } from "react";
import SidebarRight from "../sidebar/SidebarRight";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex max-w-[1332px] w-full mx-auto">
      {/* left  */}
      <section className="flex-1">
        <Outlet />
      </section>
      {/* right  */}
      <SidebarRight />
    </div>
  );
};

export default memo(PublicLayout);
