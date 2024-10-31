"use client";
import BoardCard from "@/components/common/BoardCard";
import Loader from "@/components/feedback/loader";
import { useBoardStore } from "@/store/board-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const BoardsPage = () => {
  const { boards, getBoards } = useBoardStore();

  const getBoardsResult = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const response = await getBoards();
      return response;
    },
  });

  if (getBoardsResult.isLoading) return <Loader />;

  {
    if (boards.length === 0)
      return (
        <div className="text-center font-medium p-4">
          No boards found. Create a new board to get started.
        </div>
      );
    else
      return (
        <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {boards.map((item) => (
            <BoardCard key={item.id} data={item} />
          ))}
        </div>
      );
  }
};

export default BoardsPage;
