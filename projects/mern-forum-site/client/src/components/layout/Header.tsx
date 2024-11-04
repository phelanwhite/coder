import { Link } from "react-router-dom";
import InputSearch from "../common/InputSearch";
import { FaBell } from "react-icons/fa";
import AuthButtonMenu from "../common/auth/AuthButtonMenu";
import { memo, useEffect, useState } from "react";
import { useNotificationStore } from "@/stores/notification-store";
import clsx from "clsx";

const Header = () => {
  return (
    <div className="h-16 sticky top-0 left-0 right-0 z-50 border-b bg-white p-3 flex items-center justify-between gap-4 ">
      <Link to={`/`}>
        <span className="bg-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
          PL
        </span>
      </Link>
      <InputSearch />
      <div className="flex items-center gap-4 text-text-secondary-color-1">
        <Link to={`/me/notifications`}>
          <FaBell size={18} />
        </Link>
        <AuthButtonMenu />
      </div>
    </div>
  );
};

export default memo(Header);
