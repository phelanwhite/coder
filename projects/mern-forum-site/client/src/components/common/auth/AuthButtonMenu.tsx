import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import {
  ADMIN_MENU_LINKS,
  USER_MENU_LINKS,
} from "@/assets/constants/links-constant";
import { useAuthStore } from "@/stores/auth-store";
import clsx from "clsx";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import SigninSignupModal from "./SigninSignupModal";

const AuthButtonMenu = () => {
  const { user, loggout, isAuthenticated } = useAuthStore();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const customUserMenuLinks = useMemo(() => {
    if (user?.role === "admin") {
      return Object.values(ADMIN_MENU_LINKS);
    }
    return Object.values(USER_MENU_LINKS);
  }, [user]);

  return (
    <>
      {isAuthenticated ? (
        <div className="relative" ref={menuRef}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-7 h-7 overflow-hidden rounded-full border cursor-pointer"
          >
            <img
              src={user?.avatar || IMAGES_DEFAULT.account_notfound}
              loading="lazy"
              alt=""
            />
          </div>
          {isOpen && (
            <div className="button-show-menu absolute top-8 right-0 z-[999] bg-white shadow-lg border py-2 rounded-lg w-[230px] text-sm px-6 overflow-y-auto max-h-[80vh] ">
              {/* auth  */}
              <div className="border-b pt-2 pb-4 flex items-center gap-3">
                <div className="w-10 h-10 overflow-hidden rounded-full border">
                  <img
                    src={user?.avatar || IMAGES_DEFAULT.account_notfound}
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div>
                  <div className="text-base font-medium">{user?.name}</div>
                  <div className="text-xs">@phelanwhite</div>
                </div>
              </div>
              {/* links  */}
              {customUserMenuLinks.map((item, index) => (
                <div key={index} className="border-b py-2">
                  {item.map((item) => {
                    return (
                      <NavLink
                        onClick={() => setIsOpen(false)}
                        to={item.path}
                        key={item?.title}
                        className={({ isActive }) =>
                          clsx([
                            "block py-2 hover:text-black",
                            isActive && `text-black`,
                          ])
                        }
                      >
                        {item?.title}
                      </NavLink>
                    );
                  })}
                </div>
              ))}

              <div className="py-2">
                <button
                  onClick={() => {
                    loggout();
                    setIsOpen(false);
                  }}
                  className="block py-2 hover:text-black w-full text-left"
                >
                  Loggout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpenModal(true)}
          className="btn btn-success rounded-full font-medium px-5 "
        >
          Loggin
        </button>
      )}
      <SigninSignupModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
};

export default memo(AuthButtonMenu);
