import { BoardType } from "@/assets/type";
import { useBoardStore } from "@/stores/board-store";
import React, { memo } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

type Type = {
  board: BoardType;
};

const BoardCard = ({ board }: Type) => {
  const { updateBoardById } = useBoardStore();
  return (
    <div className="px-3 py-1 flex gap-2 items-center cursor-pointer hover:bg-[--bg-color-board-card-hover]">
      <div className="w-6 h-4 overflow-hidden rounded-sm">
        <img
          src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x79/065c0c2fe325bd06268a66e2d6fe69d0/photo-1731176497854-f9ea4dd52eb6.webp"
          loading="lazy"
          alt=""
        />
      </div>
      <Link className="flex-1" to={`/board/${board._id}`}>
        {board.title}
      </Link>
      <div
        onClick={() =>
          updateBoardById(board._id, {
            favorite: !board.favorite,
          })
        }
      >
        <button>{board.favorite ? <FaStar /> : <FaRegStar />}</button>
      </div>
    </div>
  );
};

export default memo(BoardCard);
