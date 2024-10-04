import { authLinks } from "@/assets/constants";
import CreateAndUpdateListForm from "@/components/commons/list/CreateAndUpdateListForm";
import clsx from "clsx";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const LibraryPage = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <CreateAndUpdateListForm isOpen={isOpen} onClose={handleClose} />
      <div className="w-full space-y-10 iPad:px-6">
        {/* title  */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="title">Your library</div>
          <div className="flex items-center gap-2">
            <button onClick={handleOpen} className="btn-success">
              New list
            </button>
          </div>
        </div>
        {/* links */}
        <div className="overflow-x-auto border-b border-borderColor pb-4 ">
          <div className="flex items-center gap-6 text-textSecondaryColor">
            {authLinks.library.list.map((link) => (
              <Link
                key={link.title}
                to={authLinks.library.path + link.path}
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

export default LibraryPage;
