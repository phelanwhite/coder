import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { memo } from "react";

const HomeSideLeft = ({ data }: { data: any }) => {
  return (
    <div className="w-[250px] min-h-screen overflow-y-auto ">
      <ul className="bg-white p-2 rounded-lg">
        <li className="px-4 font-medium mb-2 text-base">Category</li>
        {data.map((item: any) => {
          return (
            <li key={item._id}>
              <NavLink
                to={`/search/` + item?.name}
                className={({ isActive }) =>
                  clsx([
                    `flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 transition`,
                  ])
                }
              >
                <div className="w-6">
                  <img src={item?.thumbnail} loading="lazy" alt="" />
                </div>
                <span className="flex-1">{item?.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(HomeSideLeft);
