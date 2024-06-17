import Wrapper from "components/Wrapper";
import React, { useCallback, useState } from "react";
import { headerMenuLink } from "constants/menuLink";
import { Link, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import SlidebarLeft from "./SlidebarLeft";
import Logo from "components/Logo";

const Header = () => {
  const [isShowSlidebar, setIsHideSlidebar] = useState(false);
  const handleCloseSlidebar = useCallback(() => setIsHideSlidebar(false), []);
  const handleOpenSlidebar = useCallback(() => setIsHideSlidebar(true), []);

  return (
    <div className="sticky bg-bgColor z-[100] top-0 left-0 right-0 shadow">
      <Wrapper>
        <div className="py-4 flex items-center justify-between">
          <Link to={`/`}>
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {headerMenuLink.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    [`font-semibold`, isActive && "text-red-500"].join(` `)
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <button onClick={handleOpenSlidebar}>
              <IoMenu size={24} />
            </button>
          </div>
        </div>
      </Wrapper>

      <div
        className={[
          `fixed z-[1000] top-0 left-0 bottom-0 overflow-hidden bg-black/50 duration-300`,
          isShowSlidebar ? `w-full` : `w-0`,
        ].join(" ")}
      >
        <SlidebarLeft close={handleCloseSlidebar} />
      </div>
    </div>
  );
};

export default Header;
