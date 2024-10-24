import { images } from "@/assets/constants";
import { useAuthStore } from "@/stores/auth-store";
import { memo, useState } from "react";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  const { user } = useAuthStore();
  const [isOpen, setIsopen] = useState(false);
  const handleOpen = () => setIsopen(true);
  const handleClose = () => setIsopen(false);
  return (
    <>
      <div className="flex flex-col-reverse iPad:flex-row max-iPad:gap-6 items-start justify-evenly max-w-[1336px] mx-auto">
        {/* right  */}
        <div className="w-full space-y-10 iPad:px-6">
          <Outlet />
        </div>
        {/* left  */}
        <div className="iPad:max-w-[350px] w-full iPad:border-l border-[#F2F2F2] iPad:px-6 space-y-10">
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

export default memo(ProfileLayout);
