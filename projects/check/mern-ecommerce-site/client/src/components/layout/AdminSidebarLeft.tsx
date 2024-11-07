import { adminLinks } from "@/assets/constants/links";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { memo } from "react";

const AdminSidebarLeft = () => {
  return (
    <div className="w-[250px] min-h-screen overflow-y-auto bg-white p-2">
      <ul>
        {adminLinks.map((item) => {
          return (
            <li key={item.label} className="mt-4 first:mt-0">
              <div className=" mb-2 font-medium text-secondary-2 px-4">
                {item.label}
              </div>
              <ul>
                {item.list.map((itemC) => (
                  <li key={itemC.label}>
                    <NavLink
                      to={`/admin` + item.path + itemC.path}
                      className={({ isActive }) =>
                        clsx([
                          `flex items-center gap-5 px-4 py-2 text-secondary-1 rounded-lg hover:bg-gray-100`,
                          isActive && `bg-gray-200 text-black`,
                        ])
                      }
                    >
                      <span>{itemC?.icon}</span>
                      <span className="">{itemC?.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(AdminSidebarLeft);
