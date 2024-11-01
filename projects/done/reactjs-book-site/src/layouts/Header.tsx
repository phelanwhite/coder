import { useEffect, useState } from "react";
import { FaBars, FaBook } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const headerMenuLink = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Bookmarks",
    link: "/bookmarks",
  },
];

const Header = () => {
  return (
    <div className="sticky top-0 left-0 right-0 bg-white py-4 shadow z-30">
      <div className="wrapper">
        <div className="flex items-center justify-between">
          <Link
            to={`/`}
            className="font-semibold text-xl flex items-center gap-2"
          >
            <FaBook />
            PhelanBook
          </Link>
          <div className="flex items-center gap-4 font-semibold">
            {headerMenuLink.map((item, index) => {
              return (
                <div key={index}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) => [``].join(" ")}
                  >
                    {item.name}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
