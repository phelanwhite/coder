import { user_links } from "@/assets/constants/links-constant";
import clsx from "clsx";
import React, { memo } from "react";
import { NavLink } from "react-router-dom";

const AuthSidebarLeft = () => {
  return (
    <div className="bg-[rgb(3,37,65)] text-white h-full max-w-[250px] w-full p-4 rounded-md hidden md:block">
      {user_links.map((item) => (
        <NavLink
          key={item.title}
          to={item.path}
          className={({ isActive }) =>
            clsx([`block px-4 py-2 hover:border-gray-100`])
          }
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(AuthSidebarLeft);
