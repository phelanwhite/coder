import ButtonMenu from "@/components/form/button-menu";
import Loader from "@/components/layout/loader";
import { useHistoryStore } from "@/stores/history-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const BlogCardHistoryButtonMenu = ({ data }: { data: any }) => {
  const { deleteHistory } = useHistoryStore();
  const deleteFavoriteResult = useMutation({
    mutationFn: async () => {
      return deleteHistory(`blog=${data?._id}`);
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

  if (deleteFavoriteResult.isPending) return <Loader />;

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

export default memo(BlogCardHistoryButtonMenu);