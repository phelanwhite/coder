import React, { memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { user_links } from "@/assets/constants/links-constant";

const AuthLayout = () => {
  const location = useLocation();
  return (
    <div className="wrapper py-10 flex items-stretch gap-4">
      <div className="w-full overflow-x-auto">
        <div className="text-xl font-medium mb-4">
          {
            user_links.find((item) => location.pathname?.includes(item.path))
              ?.title
          }
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default memo(AuthLayout);
