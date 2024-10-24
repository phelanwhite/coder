import { authLinks, images } from "@/assets/constants";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import { PiNotePencil } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import SigninSignupModal from "./SigninSignupModal";

const AuthMenu = () => {
  const { user, signout } = useAuthStore();
  const signoutResult = useMutation({
    mutationFn: async () => {
      return await signout();
    },
  });

  const location = useLocation();
  const [isOpen, setIsopen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsopen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [isOpenSigninModal, setIsOpenSigninModal] = useState(false);

  return (
    <div className="relative z-50" ref={menuRef}>
      <SigninSignupModal
        isOpen={isOpenSigninModal}
        onClose={() => setIsOpenSigninModal(false)}
      />
      <div
        onClick={() => setIsopen(!isOpen)}
        className="cursor-pointer w-8 h-8 overflow-hidden rounded-full border border-borderColor"
      >
        <img
          src={user?.avatar || images.account_notfound}
          loading="lazy"
          alt=""
        />
      </div>
      {isOpen && (
        <div className="mt-3 absolute w-[260px] top-[100%] right-0 bg-white shadow-md border">
          {user ? (
            <>
              <ul className="py-4 border-b border-b-borderColor font-medium">
                <li>
                  <Link
                    onClick={() => setIsopen(false)}
                    to={`/me/new-story`}
                    className="px-6 py-2 md:hidden flex items-center gap-2 hover:text-textColor"
                  >
                    <span className="text-xl">
                      <PiNotePencil />
                    </span>
                    <span>Write</span>
                  </Link>
                </li>
                {authLinks.menu.list1.map((item) => (
                  <li key={item.path}>
                    <Link
                      onClick={() => setIsopen(false)}
                      to={authLinks.menu.path + item.path}
                      className={clsx(
                        "px-6 py-2 flex items-center gap-2 hover:text-textColor",
                        location.pathname.includes(item.path) &&
                          `text-textColor`
                      )}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="py-4 border-b border-b-borderColor font-medium">
                {authLinks.menu.list2.map((item) => (
                  <li key={item.path}>
                    <Link
                      onClick={() => setIsopen(false)}
                      to={authLinks.menu.path + item.path}
                      className={clsx(
                        "px-6 py-2 flex items-center gap-2 hover:text-textColor",
                        location.pathname.includes(item.path) &&
                          `text-textColor`
                      )}
                    >
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="py-4 border-b border-b-borderColor">
                <li>
                  <button
                    onClick={() => {
                      signoutResult.mutate();
                      setIsopen(false);
                    }}
                    className="block px-6 py-2 text-left hover:text-textColor"
                  >
                    <div className="font-medium">Sign out</div>
                    <div className="line-clamp-1">{user?.email}</div>
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <ul className="border-b border-b-borderColor p-6 space-y-4">
              <li className="text-center font-medium text-black text-base">
                Get started on Blogger
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsopen(false);
                    setIsOpenSigninModal(true);
                  }}
                  className="text-xs btn-success w-full"
                >
                  Sign up
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsopen(false);
                    setIsOpenSigninModal(true);
                  }}
                  className="text-xs btn border-black w-full"
                >
                  Sign in
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(AuthMenu);
