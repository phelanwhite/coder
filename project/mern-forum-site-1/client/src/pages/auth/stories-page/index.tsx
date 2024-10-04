import { authLinks } from "@/assets/constants";
import clsx from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";

const StoriesPage = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-full space-y-10 iPad:px-6">
        {/* title  */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="title">Your stories</div>
          <div className="flex items-center gap-2">
            <Link to={`/me/new-story`} className="btn-success">
              Write a story
            </Link>
          </div>
        </div>
        {/* links */}
        <div className="overflow-x-auto border-b border-borderColor pb-4 ">
          <div className="flex items-center gap-6 text-textSecondaryColor">
            {authLinks.stories.list.map((link) => (
              <Link
                key={link.title}
                to={authLinks.stories.path + link.path}
                className={clsx(
                  "text-link hover:text-textColor min-w-max",
                  location.pathname.includes(link.path) &&
                    "text-textColor font-medium"
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
    </>
  );
};

export default StoriesPage;
