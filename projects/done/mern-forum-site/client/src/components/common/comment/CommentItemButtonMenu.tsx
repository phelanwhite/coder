import ButtonMenu from "@/components/form/button-menu";
import { useCommentStore } from "@/stores/comment-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { BiLink } from "react-icons/bi";
import { MdDelete, MdReportProblem } from "react-icons/md";

const CommentItemButtonMenu = ({ data }: { data: any }) => {
  const { deleteCommentById } = useCommentStore();
  const deleteCommentByIdResult = useMutation({
    mutationFn: async () => {
      return deleteCommentById(data?._id);
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
      deleteCommentByIdResult.mutate();
    }
  };
  return (
    <ButtonMenu>
      <button
        onClick={handleDelete}
        className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
      >
        <MdDelete size={16} />
        <span className="flex-1 text-left">Remove</span>
      </button>
    </ButtonMenu>
  );
};

export default memo(CommentItemButtonMenu);
