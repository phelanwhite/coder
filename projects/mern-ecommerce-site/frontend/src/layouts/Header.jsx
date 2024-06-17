import React from "react";
import Wrapper from "./Wrapper";
import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";

const headerTopLink = [
  {
    name: `Trang chủ`,
    path: `/`,
    icon: <FaHome size={20} />,
  },
  {
    name: `Tài khoản`,
    path: `/user`,
    icon: <FaUser size={20} />,
  },
];

const Header = () => {
  return (
    <div className="p-4 bg-white">
      <Wrapper>
        <div className="flex items-center justify-between ">
          Logo
          <div>
            <div className="flex items-center">
              {headerTopLink.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      `flex items-center gap-2 transition py-2 px-4 rounded-lg hover:bg-blue-100`,
                      isActive && `text-blue-500 font-bold`,
                    ].join(" ")
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
              <NavLink
                to={`/cart`}
                className={({ isActive }) =>
                  [
                    `relative flex items-center gap-2 transition py-2 px-4 rounded-lg hover:bg-blue-100`,
                    isActive && `text-blue-500 font-bold`,
                  ].join(" ")
                }
              >
                <span className="z-10 absolute -top-2 right-0 bg-red-500 text-white rounded-full h-4 text-xs py-0.5 px-1 flex items-center justify-center leading-3">
                  0
                </span>
                <span>
                  <FaShoppingCart size={20} />
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Header;
