import { BoardType } from "@/assets/type";
import BoardCard from "@/components/common/board/BoardCard";
import { useBoardStore } from "@/stores/board-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { memo } from "react";
import { MdAdd } from "react-icons/md";

const SidebarLeft = () => {
  const { boards, addBoard, getBoards } = useBoardStore();
  const getBoardsResult = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const response = await getBoards();
      return response;
    },
  });
  const addBoardResult = useMutation({
    mutationFn: async () => {
      const response = await addBoard({
        title: "New Board",
      });
      return response;
    },
  });
  return (
    <div className="w-[260px] h-screen bg-[--bg-side-color] text-white">
      <div>
        <div className="pl-3 pr-2 py-2 flex items-center justify-between">
          <span className="font-medium">Các bảng của bạn</span>
          <button
            onClick={() => addBoardResult.mutate()}
            className="p-0.5 rounded-sm hover:bg-[--bg-color-board-card-hover]"
          >
            <MdAdd size={16} />
          </button>
        </div>
        <ul>
          {boards.map((item) => {
            return (
              <li key={item._id}>
                <BoardCard board={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default memo(SidebarLeft);
