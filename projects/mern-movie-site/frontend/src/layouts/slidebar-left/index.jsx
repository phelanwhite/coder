import { NavLink, useNavigate } from "react-router-dom";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import {
  menuFooterLink,
  menuHeaderLink,
  menuPersonalLink,
} from "data/containts";
import { useSignoutMutation } from "features/auth/services/authApi";
import { setCurrentUser } from "features/auth/services/authSlice";

const SlidebarLeft = ({ isShowSlidebar, close }) => {
  const naviagate = useNavigate();
  const user = useSelector((state) => state.authSlice?.currentUser?.data);
  const dispatch = useDispatch();
  const [signout, signoutResult] = useSignoutMutation();

  return (
    <div
      className={[
        `z-[100] bg-black/50 fixed top-0 left-0 bottom-0 overflow-hidden flex duration-300`,
        isShowSlidebar ? `w-full` : `w-0`,
      ].join(" ")}
    >
      <div className="max-w-[300px] w-full p-4 h-full bg-black overflow-y-auto flex flex-col gap-6">
        <div className="mx-auto w-max">
          <NavLink to={`/`}>
            <div className="text-2xl font-bold">
              <span>Phelan</span>
              <span className="text-red-500">Flix</span>
            </div>
          </NavLink>
        </div>

        {user && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 overflow-hidden rounded-full">
              <img src={user?.avatar} loading="lazy" alt="" />
            </div>
            <div>
              <div className="line-clamp-1">{user?.name}</div>
              <div className="mt-0.5 text-xs line-clamp-1 capitalize">
                {user?.role}
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="text-base font-semibold mb-2">Menu</div>
          <ul className="flex flex-col gap-2">
            {menuHeaderLink.map((item, index) => (
              <li key={index}>
                <NavLink
                  onClick={close}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      `font-semibold btn justify-start border-none gap-4 hover:bg-slate-600`,
                      isActive ? `btn-danger` : ``,
                    ].join(" ")
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-base font-semibold mb-2">Personal</div>
          <ul className="flex flex-col gap-2">
            {menuPersonalLink.map((item, index) => (
              <li key={index}>
                <NavLink
                  onClick={close}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      `font-semibold btn justify-start border-none gap-4 hover:bg-slate-600`,
                      isActive ? `btn-danger` : ``,
                    ].join(" ")
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-base font-semibold mb-2">Setting</div>
          <ul className="flex flex-col gap-2">
            {!user ? (
              <li>
                <NavLink
                  to={`/signin`}
                  onClick={close}
                  className={({ isActive }) =>
                    [
                      `font-semibold btn justify-start border-none gap-4 hover:bg-slate-600`,
                      isActive ? `btn-danger` : ``,
                    ].join(" ")
                  }
                >
                  <PiSignInBold />
                  <span>Signin</span>
                </NavLink>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    close();
                    dispatch(setCurrentUser(null));
                    signout();
                    naviagate("/signin");
                  }}
                  className={[
                    `font-semibold btn justify-start border-none gap-4 hover:bg-slate-600 w-full`,
                  ].join(" ")}
                >
                  <PiSignOutBold />
                  <span>Signout</span>
                </button>
              </li>
            )}
          </ul>
        </div>

        <div className="mt-10">
          <div className="flex justify-center gap-4 items-center">
            {menuFooterLink.map((item, index) => (
              <a href={item.path} key={index} className="hover:text-red-500">
                {item.icon}
              </a>
            ))}
          </div>
          <div className="text-xs text-center mt-4">Copyright © 2024</div>
        </div>
      </div>
      <div className="flex-1" onClick={close}></div>
    </div>
  );
};

export default memo(SlidebarLeft);
