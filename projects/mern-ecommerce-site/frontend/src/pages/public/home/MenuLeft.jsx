import React, { memo, useCallback } from "react";
import { NavLink } from "react-router-dom";

const MenuLeft = ({ data }) => {
  const getId = useCallback((text = "") => {
    const length = text.split("/").length - 1;
    return text.split("/")[length].replace("c", "").padStart(4, 0);
  }, []);
  return (
    <div>
      <div className="py-3 px-2 rounded-lg bg-white mb-4">
        <div className="mb-2 pl-4 font-bold">{data?.menu_block?.title}</div>
        <div className="">
          {data?.menu_block?.items?.map((item) => (
            <NavLink
              to={`/product-by-category/${getId(item?.link)}`}
              key={item?.link}
              className={({ isActive }) =>
                [
                  `flex gap-2 items-center py-2 px-4 rounded-lg hover:bg-stone-100`,
                ].join(" ")
              }
            >
              <div className="w-8 h-8">
                <img src={item?.icon_url} alt="" />
              </div>
              <div className="flex-1">{item?.text}</div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="py-3 px-2 rounded-lg bg-white">
        <div className="mb-2 pl-4 font-bold">
          {data?.highlight_block?.title}
        </div>
        <div className="">
          {data?.highlight_block?.items?.map((item) => (
            <NavLink
              key={item?.link}
              className={({ isActive }) =>
                [
                  `flex gap-2 items-center py-2 px-4 rounded-lg hover:bg-stone-100`,
                ].join(" ")
              }
            >
              <div className="w-8 h-8">
                <img src={item?.icon_url} alt={item?.icon_url} loading="lazy" />
              </div>
              <div className="flex-1">{item?.text}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(MenuLeft);
