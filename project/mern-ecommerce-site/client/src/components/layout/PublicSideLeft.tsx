import { authLinks } from "@/assets/constants/links";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const PublicSideLeft = () => {
  return (
    <div className="w-[250px] min-h-screen overflow-y-auto ">
      <ul className="bg-white p-2 rounded-lg">
        <li className="px-4 font-medium mb-2 text-base">Category</li>
        {authLinks.map((item) => {
          return (
            <li key={item.label}>
              <NavLink
                to={`/customer` + item.path}
                className={({ isActive }) =>
                  clsx([
                    `flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-gray-100 transition`,
                  ])
                }
              >
                <div className="w-6">
                  <img
                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <span>Nhà Sách Tiki</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PublicSideLeft;
