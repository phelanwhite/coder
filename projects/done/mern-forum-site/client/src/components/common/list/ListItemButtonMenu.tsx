import ButtonMenu from "@/components/form/button-menu";
import Loader from "@/components/layout/loader";
import { useListStore } from "@/stores/list-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const ListItemButtonMenu = ({ data }: { data: any }) => {
  const { deleteListById } = useListStore();
  const deleteListByIdResult = useMutation({
    mutationFn: async () => {
      return deleteListById(data?._id);
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
      deleteListByIdResult.mutate();
    }
  };

  if (deleteListByIdResult.isPending) return <Loader />;

  return (
    <ButtonMenu>
      <Link
        to={`/me/update-list/${data?._id}`}
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
    </ButtonMenu>
  );
};

export default memo(ListItemButtonMenu);
