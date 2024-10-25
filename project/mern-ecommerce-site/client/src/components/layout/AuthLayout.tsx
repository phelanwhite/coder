import { Outlet, useLocation } from "react-router-dom";
import AuthSidebarLeft from "./AuthSidebarLeft";
import { useMemo } from "react";
import { authLinks } from "@/assets/constants/links";

const AuthLayout = () => {
  const location = useLocation();
  const title = useMemo(() => {
    const path = location.pathname.split("/").reverse()?.[0];
    return authLinks.find((item) => item.path.includes(path))?.label;
  }, [location.pathname]);

  return (
    <div className="flex gap-6">
      <div className="md:block hidden">
        <AuthSidebarLeft />
      </div>
      <div className="flex-1 py-4 overflow-hidden">
        <div className="text-xl mb-4">{title}</div>
        <div className="rounded-lg bg-white p-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
