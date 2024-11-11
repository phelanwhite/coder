import ButtonMenu from "@/components/form/button-menu";
import { useBlogStore } from "@/stores/blog-store";
import { useFavoriteStore } from "@/stores/favorite-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { BiLink } from "react-icons/bi";
import { MdDelete, MdEdit, MdReportProblem } from "react-icons/md";
import { Link } from "react-router-dom";

const BlogCardFavoriteButtonMenu = ({ data }: { data: any }) => {
  const { deleteFavorite } = useFavoriteStore();
  const deleteFavoriteResult = useMutation({
    mutationFn: async () => {
      return deleteFavorite(`blog=${data?._id}`);
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
      deleteFavoriteResult.mutate();
    }
  };

  const handleCopyClipboard = async () => {
    await navigator.clipboard
      .writeText(window.location.href)
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

      <button
        onClick={handleDelete}
        className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
      >
        <MdDelete size={16} />
        <span className="flex-1 text-left">Remove</span>
      </button>
      <button className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full">
        <MdReportProblem size={16} />
        <span className="flex-1 text-left">Report article</span>
      </button>
    </ButtonMenu>
  );
};

export default memo(BlogCardFavoriteButtonMenu);
