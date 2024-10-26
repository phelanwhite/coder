import { Outlet, useLocation } from "react-router-dom";
import { memo, useMemo } from "react";
import { adminLinks } from "@/assets/constants/links";
import AdminSidebarLeft from "./AdminSidebarLeft";

const AdminLayout = () => {
  // const location = useLocation();
  // const title = useMemo(() => {
  //   const path = location.pathname.split("/").reverse()?.[0];
  //   return adminLinks.find((item) =>
  //     item.list.find((itemC) => itemC.path.includes(path))
  //   );
  // }, [location.pathname]);
  // console.log({ title });

  return (
    <>
      <div className="flex gap-6">
        <div className="hidden md:block ">
          <AdminSidebarLeft />
        </div>
        <div className="flex-1 py-4 overflow-hidden">
          {/* <div className="text-xl mb-4">{title}</div> */}
          <div className="rounded-lg bg-white p-4 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AdminLayout);
