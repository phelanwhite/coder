import Loader from "@/components/layouts/loader";
import { useBlogStore } from "@/stores/blog-store";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import toast from "react-hot-toast";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import ButtonOption from "../ButtonOption";
const BlogItemMenu = ({ isDraft, data }: { isDraft?: boolean; data: any }) => {
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
    <ButtonOption label={<HiDotsHorizontal />}>
      <div>
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
    </ButtonOption>
  );
};
export default memo(BlogItemMenu);
