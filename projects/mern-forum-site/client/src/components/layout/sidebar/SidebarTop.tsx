import { Link, NavLink } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { memo } from "react";
import { header_links, user_links } from "@/assets/constants/links-constant";
import { useAuthStore } from "@/stores/auth-store";
const SidebarTop = ({ handleClose }: { handleClose: () => void }) => {
  const { user, loggout } = useAuthStore();
  return (
    <div className="overflow-y-auto relative max-w-[500px] w-full h-a max-h-full p-6 py-10 rounded-lg bg-white text-black flex flex-col gap-2 items-center">
      <button onClick={handleClose} className="absolute top-4 right-4">
        <IoIosCloseCircle size={20} />
      </button>
      {header_links.map((link) => (
        <NavLink
          onClick={handleClose}
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            [
              `block font-semibold px-4 py-2 rounded-lg text-center  hover:bg-gray-100`,
              isActive && `text-red-500 bg-gray-100`,
            ].join(" ")
          }
        >
          {link.title}
        </NavLink>
      ))}
      {user_links.map((link) => (
        <NavLink
          onClick={handleClose}
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            [
              `block font-semibold px-4 py-2 rounded-lg text-center  hover:bg-gray-100`,
              isActive && `text-red-500 bg-gray-100`,
            ].join(" ")
          }
        >
          {link.title}
        </NavLink>
      ))}

      {user ? (
        <button
          onClick={() => {
            loggout();
            handleClose();
          }}
          className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-500 text-white"
        >
          Signout
        </button>
      ) : (
        <Link
          onClick={handleClose}
          to={`/signin`}
          className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-500 text-white"
        >
          Signin
        </Link>
      )}
    </div>
  );
};

export default memo(SidebarTop);
