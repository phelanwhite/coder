import ButtonMenu from "@/components/form/button-menu";
import { useBlogStore } from "@/stores/blog-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { BiLink } from "react-icons/bi";
import { TbStatusChange } from "react-icons/tb";
import { MdDelete, MdEdit, MdReportProblem } from "react-icons/md";
import { Link } from "react-router-dom";

const BlogCardAuthorButtonMenu = ({ data }: { data: any }) => {
  const { deleteBlogById, changeStatusBlogById } = useBlogStore();
  const deleteBlogByIdResult = useMutation({
    mutationFn: async () => {
      return deleteBlogById(data?._id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const changeStatusBlogByIdResult = useMutation({
    mutationFn: async () => {
      return changeStatusBlogById(data?._id, {
        status: data?.status ? false : true,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleDelete = async () => {
    if (window.confirm(`You definitely want to delete`)) {
      deleteBlogByIdResult.mutate();
    }
  };

  const handleCopyClipboard = async () => {
    await navigator.clipboard
      .writeText("https://example.com")
      .then((value) => {
        toast.success(`Copy link successfully!`);
      })
      .catch((err) => {
        toast.error(`Failed to copy link! Please try again later.`);
        console.error(err);
      });
  };

  return (
    <ButtonMenu>
      <button
        onClick={() => {
          handleCopyClipboard();
        }}
        className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
      >
        <BiLink size={16} />
        <span className="flex-1 text-left">Copy link</span>
      </button>
      <Link
        to={`/me/update-blog/${data?._id}`}
        className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
      >
        <MdEdit size={16} />
        <span className="flex-1 text-left">Edit</span>
      </Link>
      <button
        onClick={handleDelete}
        className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
      >
        <MdDelete size={16} />
        <span className="flex-1 text-left">Remove</span>
      </button>
      <button
        onClick={() => {
          changeStatusBlogByIdResult.mutate();
        }}
        className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
      >
        <TbStatusChange size={16} />
        <span className="flex-1 text-left">
          {!data?.status ? `Make blog published` : `Make blog private`}
        </span>
      </button>
      <button className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full">
        <MdReportProblem size={16} />
        <span className="flex-1 text-left">Report article</span>
      </button>
    </ButtonMenu>
  );
};

export default memo(BlogCardAuthorButtonMenu);