import IMAGES_DEFAULT from "@/assets/constants/image";
import ProfileUpdateForm from "@/components/common/auth/ProfileUpdateForm";
import axiosConfig from "@/configs/axios-config";
import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiNewspaperLine } from "react-icons/ri";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, getMe } = useAuthStore();
  const getMeResult = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return await getMe();
    },
    enabled: !!user,
  });
  return (
    <>
      <ProfileUpdateForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="max-w-[800px] w-full mx-auto px-3">
        <div className="relative">
          <div className="rounded-lg overflow-hidden h-[200px]">
            {user?.banner ? (
              <img src={user?.banner} alt="" loading="lazy" />
            ) : (
              <div className="bg-gray-200 w-full h-full"></div>
            )}
          </div>
          <div className="absolute -bottom-12 left-4 p-1 bg-white rounded-full w-max">
            <div className="w-24 h-24 overflow-hidden rounded-full">
              <img
                src={user?.avatar || IMAGES_DEFAULT.account_notfound}
                loading="lazy"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="mt-12 ">
          <div className="font-medium text-xl">{user?.name}</div>
          <div className="">{user?.bio}</div>
          <div className="mt-4">
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-success w-full md:w-max flex items-center justify-center gap-2"
            >
              <MdEdit />
              Update Profile
            </button>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <RiNewspaperLine size={20} />
              <span>{user?.count_blog} posts published</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <RiNewspaperLine size={20} />
              <span>{user?.count_comment} comments written</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <RiNewspaperLine size={20} />
              <span>{user?.count_follower} follower</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <RiNewspaperLine size={20} />
              <span>{user?.count_following} following</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <RiNewspaperLine size={20} />
              <span>{user?.count_favorite} posts favorite</span>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <RiNewspaperLine size={20} />
              <span>{user?.count_bookmark} posts bookmark</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
