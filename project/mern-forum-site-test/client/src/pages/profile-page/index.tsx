import ProfileInformationForm from "@/components/form/ProfileInformationForm";
import { useState } from "react";
import { images, links } from "@/assets/constants";
import clsx from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [isOpen, setIsopen] = useState(false);
  const handleOpen = () => setIsopen(true);
  const handleClose = () => setIsopen(false);
  const location = useLocation();
  return (
    <>
      <ProfileInformationForm isOpen={isOpen} onClose={handleClose} />
      <div className="flex flex-col-reverse iPad:flex-row max-iPad:gap-6 items-start justify-evenly max-w-[1336px] mx-auto">
        {/* right  */}
        <div className="max-w-[728px] w-full space-y-10 iPad:px-6">
          {/* title  */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="title">{user?.name}</div>
            <div className="flex items-center gap-2"></div>
          </div>
          {/* links */}
          <div className="overflow-x-auto border-b border-borderColor pb-4 ">
            <div className="flex items-center gap-6 text-textSecondaryColor">
              {links.profile.map((link) => (
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
        <div className="max-w-[350px] w-full iPad:border-l border-[#F2F2F2] iPad:px-6 space-y-10">
          <div className="flex flex-col gap-2">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={user?.avatar || images.account_notfound}
                loading="lazy"
                alt=""
              />
            </div>
            <div>{user?.name}</div>
            <div>{user?.bio}</div>

            <div>
              <button className="text-xs text-green-500" onClick={handleOpen}>
                Edit profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
