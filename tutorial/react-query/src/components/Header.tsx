import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

const headerData = [
  {
    title: `Home`,
    path: `/`,
  },
  {
    title: `Queries`,
    path: `/queries`,
  },
  {
    title: `Query`,
    path: `/query`,
  },
  {
    title: `Infinite queries`,
    path: `/infinite-queries`,
  },
  {
    title: `Mutation`,
    path: `/mutation`,
  },
];

const Header = () => {
  return (
    <div className="p-4 border-b">
      <ul className="flex flex-wrap gap-4 justify-center items-center">
        {headerData.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                clsx([`underline`, isActive && `font-medium text-blue-500`])
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
