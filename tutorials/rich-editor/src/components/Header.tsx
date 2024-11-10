import clsx from "clsx";
import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
const navLinks = [
  {
    label: `React Quill`,
    path: `/react-quill`,
  },
  {
    label: `React Quill New`,
    path: `/react-quill-new`,
  },
  {
    label: `Tiptap`,
    path: `/tiptap`,
  },
];
const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <Link to={`/`} className="text-xl font-medium text-blue-500">
        Rich Editor
      </Link>
      <div className="space-x-4">
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={`${link.path}`}
            className={({ isActive }) => clsx([isActive && `text-blue-500`])}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <button>
        <FaBars size={20} />
      </button>
    </div>
  );
};

export default Header;
