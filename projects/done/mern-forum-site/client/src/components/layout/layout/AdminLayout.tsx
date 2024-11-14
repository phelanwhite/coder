import { ADMIN_MENU_LINKS } from "@/assets/constants/links-constant";
import React, { useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import SidebarRight from "../sidebar/SidebarRight";
import clsx from "clsx";

const AdminLayout = () => {
  const location = useLocation();
  const title = useMemo(() => {
    return Object.values(ADMIN_MENU_LINKS)
      .flat()
      .find((item) => location.pathname?.includes(item.path))?.title;
  }, [location.pathname]);
  const subLinks = useMemo(() => {
    return Object.values(ADMIN_MENU_LINKS)
      .flat()
      .find((item) => location.pathname.includes(item.path));
  }, [location.pathname]);

  return (
    <div className="flex max-w-[1332px] w-full mx-auto">
      {/* Left  */}
      <section className="flex-1">
        <div className="px-5 mb-4">
          <div className="capitalize text-2xl font-bold mb-8">{title}</div>
          <div className="overflow-x-auto">
            <div className="flex items-center gap-8 text-text-secondary-color-2 border-b">
              {subLinks?.submenu?.map((item) => {
                return (
                  <NavLink
                    to={subLinks.path + item.path}
                    key={item.title}
                    className={clsx([
                      location.pathname === subLinks.path + item.path &&
                        `text-black font-medium border-b-2 border-b-black `,
                      `pb-2`,
                    ])}
                  >
                    {item.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
        <section>
          <Outlet />
        </section>
      </section>
      {/* Right  */}
      <SidebarRight />
    </div>
  );
};

export default AdminLayout;
