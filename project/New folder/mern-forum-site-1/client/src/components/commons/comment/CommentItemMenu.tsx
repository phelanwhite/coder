import { memo } from "react";
import ButtonOption from "../ButtonOption";
import { useCommentStore } from "@/stores/comment-store";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiDotsHorizontal } from "react-icons/hi";

const CommentItemMenu = ({ data }: { data: any }) => {
  const { deleteCommentById } = useCommentStore();
  const deleteCommentByIdResult = useMutation({
    mutationFn: async () => {
      const response = await deleteCommentById(data?._id);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  return (
    <ButtonOption label={<HiDotsHorizontal />}>
      <div>
        <button className="text-left px-4 py-2 block w-max hover:text-textColor">
          Edit response
        </button>
        <button className="text-left px-4 py-2 block w-max hover:text-textColor">
          View stats
        </button>
        <button
          onClick={() => deleteCommentByIdResult.mutate()}
          className="text-left px-4 py-2 block w-max text-red-500 hover:text-textColor"
        >
          Delete response
        </button>
      </div>
    </ButtonOption>
  );
};

export default memo(CommentItemMenu);
