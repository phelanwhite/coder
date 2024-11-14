import AuthButtonMenu from "@/components/common/auth/AuthButtonMenu";
import InputSearch from "@/components/form/input-search";
import { useNotificationStore } from "@/stores/notification-store";
import clsx from "clsx";
import { memo, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const { isNotification, setNotification } = useNotificationStore();
  return (
    <header className="h-16 sticky top-0 left-0 right-0 z-50 border-b bg-white p-3 flex items-center justify-between gap-4 ">
      <Link to={`/`}>
        <span className="bg-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
          PL
        </span>
      </Link>
      <InputSearch />
      <div className="flex items-center gap-4 text-text-secondary-color-1">
        <NavLink
          onClick={() => setNotification(false)}
          to={`/me/notifications`}
          className={({ isActive }) => clsx([isActive && `text-blue-500`])}
        >
          <FaBell size={18} />
        </NavLink>
        <AuthButtonMenu />
      </div>
    </header>
  );
};

export default memo(Header);
