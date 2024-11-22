import ButtonMenu from "@/components/form/button-menu";
import { IMAGES_DEFAULT } from "@/constants/images-constant";
import useSigninRedirect from "@/hooks/useSigninRedirect";
import { useAuthStore } from "@/stores/auth-store";
import clsx from "clsx";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard, MdSettings } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const links = [
  {
    title: `Profile`,
    path: `/profile`,
    icon: <FaUserCircle />,
  },
  {
    title: `Dashboard`,
    path: `/dashboard`,
    icon: <MdDashboard />,
  },
  {
    title: `Settings`,
    path: `/setting`,
    icon: <MdSettings />,
  },
];

const AuthButtonMenu = () => {
  const { isLoggedIn, user, signout } = useAuthStore();
  const { handleSaveStateRedirect } = useSigninRedirect();

  return (
    <div>
      {isLoggedIn ? (
        <ButtonMenu
          icon={
            <div className="w-8 h-8 overflow-hidden rounded-full border">
              <img
                src={user?.avatar || IMAGES_DEFAULT.account_notfound}
                loading="lazy"
                alt=""
              />
            </div>
          }
        >
          <div className="px-2">
            <div className="px-4">
              <div className="font-medium text-base">{user?.name}</div>
              <div className="text-sm line-clamp-1 break-words">
                {user?.email}
              </div>
            </div>
            <div className="my-2 py-2 border-y">
              {links.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  className={({ isActive }) =>
                    clsx(
                      `hover:bg-gray-100 w-full flex items-center gap-2 px-4 py-2 rounded`,
                      isActive ? "bg-gray-100" : null
                    )
                  }
                >
                  <span>{link.icon}</span>
                  <span>{link.title}</span>
                </NavLink>
              ))}
            </div>
            <button
              onClick={signout}
              className={`hover:bg-gray-100 w-full flex items-center gap-2 px-4 py-2 rounded`}
            >
              <IoIosLogOut />
              <span>Signout</span>
            </button>
          </div>
        </ButtonMenu>
      ) : (
        <Link
          to={`/signin`}
          onClick={handleSaveStateRedirect}
          className="inline-block text-sm px-3 py-1.5 bg-black text-white rounded"
        >
          Signin
        </Link>
      )}
    </div>
  );
};

export default AuthButtonMenu;
