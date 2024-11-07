import { authLinks } from "@/assets/constants/links";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { memo } from "react";

const AuthSidebarLeft = () => {
  return (
    <div className="w-[250px] min-h-screen overflow-y-auto bg-white p-2">
      <ul>
        {authLinks.map((item) => {
          return (
            <li key={item.label}>
              <NavLink
                to={`/customer` + item.path}
                className={({ isActive }) =>
                  clsx([
                    `flex items-center gap-5 px-4 py-2 text-secondary-1 rounded-lg hover:bg-gray-100`,
                    isActive && `bg-gray-200 text-black`,
                  ])
                }
              >
                <span>{item?.icon}</span>
                <span className="">{item?.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(AuthSidebarLeft);
