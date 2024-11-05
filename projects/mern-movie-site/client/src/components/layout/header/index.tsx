import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { header_links } from "@/assets/constants/links-constant";
import Modal from "../modal";
import SidebarTop from "../sidebar/SidebarTop";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="z-50 sticky top-0 left-0 right-0 bg-[rgb(3,37,65)] text-white">
      <div className="wrapper py-4 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to={`/`} className={`mr-4 inline-block`}>
            <div className="text-2xl font-bold">
              <span>Phelan</span>
              <span className="text-red-500">Flix</span>
            </div>
          </NavLink>
          {header_links.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                [
                  `font-semibold px-4 py-1 rounded-lg hidden md:inline-block hover:text-red-500`,
                  isActive && `text-red-500`,
                ].join(" ")
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
        <button onClick={() => setOpen(true)}>
          <MdMenu size={24} />
        </button>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <SidebarTop handleClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
};

export default memo(Header);
