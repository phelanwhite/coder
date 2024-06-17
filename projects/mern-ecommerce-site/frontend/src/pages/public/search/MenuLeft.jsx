import React, { memo, useCallback } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const MenuLeft = ({ data, onchange }) => {
  return (
    <div className="py-3 px-4 rounded-lg bg-white">
      <div className="flex flex-col gap-4">
        {data?.map((item) =>
          item?.code === "category" ? (
            <div key={item?.code}>
              <div className="text-base font-semibold mb-1">
                {item?.display_name}
              </div>
              <div>
                {item?.values?.map((item) => (
                  <NavLink
                    key={item?.query_value}
                    to={`/product-by-category/${item?.query_value}`}
                    className={`block mb-1`}
                  >
                    {item?.display_value}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <div key={item?.code}>
              <div className="text-base font-semibold mb-1">
                {item?.display_name}
              </div>
              <div className="">
                {item?.values
                  ?.sort((a, b) => {
                    return a?.query_value - b?.query_value;
                  })
                  ?.map((itemC) => (
                    <button
                      key={itemC?.query_value}
                      className={`flex items-center gap-2 mb-1`}
                    >
                      <input
                        type="checkbox"
                        checked={itemC?.selected}
                        value={itemC?.query_value}
                        onChange={(e) => {
                          if (itemC?.selected) {
                            onchange(item?.query_name, "");
                          } else {
                            onchange(item?.query_name, e.target.value);
                          }
                        }}
                      />
                      <span>{itemC?.display_value}</span>
                    </button>
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default memo(MenuLeft);
