import ButtonMenu from "@/components/form/button-menu";
import Loader from "@/components/layout/loader";
import { useFavoriteStore } from "@/stores/favorite-store";
import { useNotificationStore } from "@/stores/notification-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { BiLink } from "react-icons/bi";
import { MdDelete, MdEdit, MdReportProblem } from "react-icons/md";
import { Link } from "react-router-dom";

const BlogCardNotificationButtonMenu = ({ data }: { data: any }) => {
  const { deleteNotification } = useNotificationStore();
  const deleteNotificationResult = useMutation({
    mutationFn: async () => {
      return deleteNotification(`blog=${data?._id}`);
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
      deleteNotificationResult.mutate();
    }
  };

  if (deleteNotificationResult.isPending) return <Loader />;

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

export default memo(BlogCardNotificationButtonMenu);
