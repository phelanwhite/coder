import { links } from "@/assets/constants";
import NavRight from "@/components/layout/NavRight";
import clsx from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";

const StoriesPage = () => {
  const location = useLocation();
  return (
    <div className="flex items-start justify-evenly max-w-[1336px] mx-auto">
      {/* right  */}
      <div className="max-w-[728px] w-full space-y-10 iPad:px-6">
        {/* title  */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="title">Your stories</div>
          <div className="flex items-center gap-2">
            <Link to={`/me/new-story`} className="btn-success">
              Write a story
            </Link>
            {/* <button className="btn border-black">Import a story</button> */}
          </div>
        </div>
        {/* links */}
        <div className="overflow-x-auto border-b border-borderColor pb-4 ">
          <div className="flex items-center gap-6 text-textSecondaryColor">
            {links.stories.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className={clsx(
                  "text-link hover:text-textColor min-w-max",
                  location.pathname === link.path && "text-textColor"
                )}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      {/* left  */}
      <div className="hidden iPad:block max-w-[350px] w-full border-l border-[#F2F2F2] px-6 space-y-10">
        <NavRight />
      </div>
    </div>
  );
};

export default StoriesPage;
