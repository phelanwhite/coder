import { LinkType } from "@/constants/type";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import clsx from "clsx";
import React, { memo, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

type Type = {
  title: React.ReactNode;
  links: LinkType[];
  children: React.ReactNode;
  sidebarRight: React.ReactNode;
};

const Layout1 = ({ title, links, children, sidebarRight }: Type) => {
  const location = useLocation();

  return (
    <div className="flex items-start justify-evenly gap-4">
      {/* left  */}
      <section className="flex-1 space-y-10">
        {/* top  */}
        <div className="px-5">
          {/* title  */}
          <div className="font-semibold text-3xl mb-8">{title}</div>
          {/* links  */}
          <div className="border-b overflow-x-auto">
            <ul className="flex items-center gap-4 text-sm font-medium text-text-secondary-color">
              {links.map((item) => (
                <li key={item.title}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      clsx([
                        "inline-block pb-4",
                        location.pathname === item.path.split(`?`)?.[0] &&
                          " border-b-black border-b text-text-color",
                      ])
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* main  */}
        <div>{children}</div>
      </section>
      {/* right  */}
      <section className="max-w-[300px] lg:max-w-screen-xs w-full space-y-10 hidden md:block">
        {sidebarRight}
      </section>
    </div>
  );
};

export default memo(Layout1);
