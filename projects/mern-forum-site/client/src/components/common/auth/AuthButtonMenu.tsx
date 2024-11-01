import { USER_MENU_LINKS } from "@/assets/constants/auth";
import IMAGES_DEFAULT from "@/assets/constants/image";
import { useAuthStore } from "@/stores/auth-store";
import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import SigninSignupModal from "./SigninSignupModal";

const AuthButtonMenu = () => {
  const { user, loggout, isAuthenticated } = useAuthStore();
  //
  const menuRef = useRef<HTMLDivElement | null>(null);
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

  //
  const [isOpenModal, setIsOpenModal] = useState(false);

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
            <div className="button-show-menu absolute top-8 right-0 z-[999] bg-white shadow-lg border py-2 rounded-lg w-[230px] text-sm px-6">
              <div className="border-b pt-2 pb-4 flex items-center gap-3">
                <div className="w-10 h-10 overflow-hidden rounded-full border">
                  <img
                    src={user?.avatar || IMAGES_DEFAULT.account_notfound}
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div>
                  <div className="text-base font-medium">Phelan White</div>
                  <div className="">@phelanwhite</div>
                </div>
              </div>
              <div className="border-b py-2">
                {USER_MENU_LINKS.menu1.map((item) => {
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
              <div className="border-b py-2">
                {USER_MENU_LINKS.menu2.map((item) => {
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
              <div className="py-2">
                {USER_MENU_LINKS.menu3.map((item) => {
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
