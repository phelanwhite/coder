import { FORUM_MENU_LINKS } from "@/assets/constants/auth";
import clsx from "clsx";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const ManagementPage = () => {
  const location = useLocation();
  return (
    <div className="">
      <div className="capitalize text-2xl font-bold mb-8">management</div>
      <div className="">
        <div className="flex items-center gap-4 text-text-secondary-color-2 border-b">
          {FORUM_MENU_LINKS.management.map((item) => {
            return (
              <NavLink
                to={item.path}
                key={item.title}
                className={clsx([
                  location.pathname === item.path &&
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
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagementPage;
