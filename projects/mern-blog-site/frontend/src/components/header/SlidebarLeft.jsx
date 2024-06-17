import Logo from "components/Logo";
import { headerMenuLink, userMenuLink } from "constants/menuLink";
import { useThemeContext } from "contexts/themeContext";
import { useSignoutMutation } from "features/auth/authApi";
import { setCurrentUser } from "features/auth/authSlice";
import React, { memo } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const SlidebarLeft = ({ close }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeContext();
  const user = useSelector((state) => state?.authSlice?.currentUser);
  const dispatch = useDispatch();
  const [signout, signoutResult] = useSignoutMutation();

  return (
    <div className="flex h-screen">
      <div className="max-w-[300px] w-full bg-bgColor overflow-y-auto py-4 px-2 flex flex-col gap-4">
        <div className="max-w-max mx-auto">
          <Link to={`/`}>
            <Logo />
          </Link>
        </div>
        {user && (
          <div className="flex gap-4 mx-4">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={user?.avatar} loading="lazy" alt="" />
            </div>
            <div>
              <div className="font-medium line-clamp-1">{user?.name}</div>
              <div className="text-secondaryColor text-xs line-clamp-1">
                {user?.email}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col">
          {user &&
            userMenuLink.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                onClick={close}
                className={({ isActive }) =>
                  [
                    `font-semibold btn justify-start border-none hover:btn-primary`,
                    isActive && `btn-primary`,
                  ].join(` `)
                }
              >
                {item.name}
              </NavLink>
            ))}

          {headerMenuLink.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              onClick={close}
              className={({ isActive }) =>
                [
                  `font-semibold btn justify-start border-none hover:btn-primary`,
                  isActive && `btn-primary`,
                ].join(` `)
              }
            >
              {item.name}
            </NavLink>
          ))}
          {!user ? (
            <NavLink
              to={`/signin`}
              onClick={close}
              className={({ isActive }) =>
                [
                  `font-semibold btn justify-start border-none hover:btn-primary`,
                  isActive && `btn-primary`,
                ].join(` `)
              }
            >
              Signin
            </NavLink>
          ) : (
            <button
              onClick={() => {
                close();
                navigate(`/signin`);
                dispatch(setCurrentUser(null));
                signout();
              }}
              className={[
                `font-semibold btn justify-start border-none hover:btn-primary`,
              ].join(` `)}
            >
              Signout
            </button>
          )}
          {theme ? (
            <button
              className="font-semibold btn justify-start gap-2 border-none hover:btn-primary"
              onClick={() => {
                close();
                toggleTheme();
              }}
            >
              <IoSunnyOutline size={20} /> Light Mode
            </button>
          ) : (
            <button
              className="font-semibold btn justify-start gap-2 border-none hover:btn-primary"
              onClick={() => {
                close();
                toggleTheme();
              }}
            >
              <MdDarkMode size={20} />
              Dark Mode
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 " onClick={close}></div>
    </div>
  );
};

export default memo(SlidebarLeft);
