import React, { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Wrapper from "components/ui/wrapper";
import { menuHeaderLink } from "data/containts";
import SlidebarLeft from "layouts/slidebar-left";

const Header = () => {
  const [isShowSlidebar, setIsShowSlidebar] = useState(false);
  const [isBgHeader, setIsBgHeader] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        setIsBgHeader(true);
      } else {
        setIsBgHeader(false);
      }
    });
  }, []);

  const openSlidebar = () => {
    setIsShowSlidebar(true);
  };
  const closeSlidebar = () => {
    setIsShowSlidebar(false);
  };
  return (
    <div
      className={[
        `fixed top-0 left-0 right-0 text-white z-[100] py-4`,
        isBgHeader ? `bg-black shadow` : ``,
      ].join(" ")}
    >
      <Wrapper>
        <div className="flex items-center gap-4">
          <button onClick={openSlidebar}>
            <IoMenu size={24} />
          </button>
          <NavLink to={`/`}>
            <div className="text-2xl font-bold">
              <span>Phelan</span>
              <span className="text-red-500">Flix</span>
            </div>
          </NavLink>
          <ul className="hidden md:flex items-center gap-4">
            {menuHeaderLink.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [`font-semibold`, isActive ? `text-red-500` : ``].join(" ")
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
      <SlidebarLeft isShowSlidebar={isShowSlidebar} close={closeSlidebar} />
    </div>
  );
};

export default memo(Header);
