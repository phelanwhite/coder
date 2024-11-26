import AuthButtonMenu from "@/components/common/auth/AuthButtonMenu";
import InputSearch from "@/components/form/input-search";
import { ICONS_DEFAULT } from "@/constants/images-constant";
import { useAuthStore } from "@/stores/auth-store";
import React, { memo, useState } from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { Link, NavLink, useLocation } from "react-router-dom";
import SidebarLeft from "../sidebar/SidebarLeft";

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className="z-[999] bg-white sticky top-0 left-0 right-0 p-4 border-b flex items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <SidebarLeft />
          <Link to={`/`} className="flex items-center gap-1">
            <div className="w-10">
              <img src={ICONS_DEFAULT.logo_svg} alt="" />
            </div>
            <span className="hidden sm:block font-medium text-xl tracking-tighter">
              Phelan White
            </span>
          </Link>
        </div>
        <InputSearch className="flex-1 hidden sm:block max-w-[500px]" />

        <div className="flex items-center gap-4">
          <NavLink to={`/search`} className="sm:hidden">
            <MdSearch size={24} />
          </NavLink>
          {isLoggedIn && (
            <NavLink to={`/notification`}>
              {location.pathname.includes("/notification") ? (
                <FaBell size={20} />
              ) : (
                <FaRegBell size={20} />
              )}
            </NavLink>
          )}
          <AuthButtonMenu />
        </div>
      </div>
    </>
  );
};

export default memo(Header);
