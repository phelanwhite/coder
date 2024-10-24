import { useAuthStore } from "@/stores/auth-store";
import { memo, useState } from "react";
import { BiLogoBlogger } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import AuthMenu from "../commons/auth/AuthMenu";

const Header = () => {
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <div className="z-10 h-[50px] sticky top-0 left-0 right-0 bg-white px-6 py-2 flex items-center justify-between border-borderColor border-b shadow-sm">
      {/* left  */}
      <div className="flex items-center gap-4">
        {/* logo  */}
        <Link to={`/`} className="flex items-end gap-0">
          <BiLogoBlogger size={28} />
          <span className="font-bold text-2xl leading-6">logger</span>
        </Link>
        {/* search  */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-bgSecondaryColor rounded-full">
          <IoSearch />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === `Enter`) {
                navigate(`search?q=${search}`);
              }
            }}
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none border-none"
          />
        </div>
      </div>
      {/* rigth  */}
      <div className="flex items-center gap-6 text-textSecondaryColor">
        <Link
          to={`/me/new-story`}
          className="hidden md:flex items-center gap-1 text-xl hover:text-textColor"
        >
          <PiNotePencil />
          <span className="text-base">Write</span>
        </Link>
        <Link to={`/search`} className="md:hidden text-xl hover:text-textColor">
          <IoSearch />
        </Link>
        {user && (
          <Link
            to={`/me/notifications`}
            className="text-xl hover:text-textColor"
          >
            <FaRegBell />
          </Link>
        )}
        <div>
          <AuthMenu />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
