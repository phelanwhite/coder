"use client";
import { useBoardStore } from "@/store/board-store";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { FC, memo } from "react";
import toast from "react-hot-toast";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from "../feedback/loader";
interface Props {
  data: any;
}
const BoardCard: FC<Props> = ({ data }) => {
  const { deleteBoardById, toggleFavoriteBoard } = useBoardStore();
  const toggleFavoriteBoardResult = useMutation({
    mutationFn: async (id: string) => {
      const response = await toggleFavoriteBoard(id);
      return await response;
    },
    onSuccess: (data) => {
      toast.success("Board favorite status updated successfully");
    },
    onError: (error) => {
      console.log(error);

      toast.error("Board favorite status updated failed");
    },
  });
  const deleteBoardByIdResult = useMutation({
    mutationFn: async (id: string) => {
      const resp = await deleteBoardById(id);
      return resp;
    },
    onSuccess: (data) => {
      toast.success("Column deleted successfully!");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(`Column deleted failed!`);
    },
  });

  if (deleteBoardByIdResult.isPending || toggleFavoriteBoardResult.isPending)
    return <Loader />;

  return (
    <div
      key={data.id}
      className="relative rounded-md bg-bg-item-board text-white"
    >
      <Link
        key={data.id}
        href={`/boards/${data.id}`}
        className="py-2 px-3 rounded-md min-h-[100px] block"
      >
        <div className="space-y-2">
          <div className="text-base font-medium">{data?.title}</div>
          <div className="text-xs text-gray-300">
            {new Date(data?.createdAt).toDateString()}
          </div>
        </div>
      </Link>
      <div className="absolute bottom-2 right-2 flex items-center justify-end gap-2">
        <button onClick={() => deleteBoardByIdResult.mutate(data?.id)}>
          <MdDelete />
        </button>
        <button onClick={() => toggleFavoriteBoardResult.mutate(data?.id)}>
          {!data?.isFavorite ? <FaRegStar /> : <FaStar />}
        </button>
      </div>
    </div>
  );
};

export default memo(BoardCard);
