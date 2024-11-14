import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { IoMdBookmark } from "react-icons/io";
import { MdComment, MdEdit, MdGroups, MdOutlineFavorite } from "react-icons/md";
import { RiNewspaperLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, getMe } = useAuthStore();
  const getMeResult = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return await getMe();
    },
    enabled: !!user,
  });

  const listData = useMemo(() => {
    return [
      {
        title: `posts published`,
        icon: <RiNewspaperLine />,
        value: user?.count_blog || 0,
      },
      {
        title: `comments written`,
        icon: <MdComment />,
        value: user?.count_comment || 0,
      },
      {
        title: `follower`,
        icon: <MdGroups />,
        value: user?.count_follower || 0,
      },
      {
        title: `following`,
        icon: <MdGroups />,
        value: user?.count_following || 0,
      },
      {
        title: `posts favorite`,
        icon: <MdOutlineFavorite />,
        value: user?.count_favorite || 0,
      },
      {
        title: `posts bookmark`,
        icon: <IoMdBookmark />,
        value: user?.count_bookmark || 0,
      },
    ];
  }, [getMeResult.data]);

  return (
    <div className="max-w-[800px] w-full mx-auto px-3">
      {/* image  */}
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
      {/* details  */}
      <div className="mt-12 ">
        <div className="font-medium text-xl">{user?.name}</div>
        <div className="">{user?.bio}</div>
        <div className="mt-4">
          <Link
            to={`/me/profile/update`}
            className="btn btn-success w-full md:w-max flex items-center justify-center gap-2"
          >
            <MdEdit />
            Update Profile
          </Link>
        </div>
      </div>

      {/* list  */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {listData.map((item) => (
          <div key={item.title} className="bg-gray-100 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <RiNewspaperLine size={20} />
              <span>
                {item?.value} {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
