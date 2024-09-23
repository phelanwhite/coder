import { useBlogStore } from "@/store/blog-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/loader";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
const BlogItemMenu = ({ isDraft, data }: { isDraft?: boolean; data: any }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const { deleteBlogById, changeStatusBlogById } = useBlogStore();
  const deleteBlogByIdResult = useMutation({
    mutationFn: async () => {
      const response = await deleteBlogById(data?._id);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
  const changeStatusBlogByIdResult = useMutation({
    mutationFn: async () => {
      const response = await changeStatusBlogById(data?._id, {
        status: isDraft ? true : false,
      });
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  if (deleteBlogByIdResult.isPending || changeStatusBlogByIdResult.isPending)
    return <Loader />;

  return (
    <div className="relative pt-1" ref={menuRef}>
      <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
        <IoIosArrowDown />
      </button>
      {isOpenMenu && (
        <div className="z-10 py-2 absolute right-0 shadow rounded border min-w-[120px] bg-white">
          <Link
            to={`/me/update-story/${data?._id}`}
            className="text-left px-4 py-2 block w-max hover:text-textColor"
          >
            {isDraft ? `Edit draft` : `Edit published`}
          </Link>
          <button
            onClick={() => deleteBlogByIdResult.mutate()}
            className="text-left px-4 py-2 block w-max text-red-500 hover:text-textColor"
          >
            {isDraft ? `Delete draft` : `Delete published`}
          </button>
          <button
            onClick={() => changeStatusBlogByIdResult.mutate()}
            className="text-left px-4 py-2 block w-max hover:text-textColor"
          >
            {isDraft ? `Make blog published` : `Make blog private`}
          </button>
        </div>
      )}
    </div>
  );
};
export default memo(BlogItemMenu);
