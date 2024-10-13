import IMAGES_DEFAULT from "@/assets/constants/image";
import { memo } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

const CommentCard1 = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 overflow-hidden rounded-full">
          <img
            src={data?.author?.avatar || IMAGES_DEFAULT.account_notfound}
            alt=""
            loading="lazy"
          />
        </div>
        <div className="font-medium text-sm">{data?.author?.name}</div>
        <div className="text-xs font-medium text-text-secondary-color-2">
          2 ngày trước
        </div>
      </div>
      <div className="mt-2 p-4 rounded-xl bg-gray-50 whitespace-pre-wrap">
        {data?.comment}
      </div>
      <div className="px-4 py-2 flex items-center gap-3 text-sm">
        <button className="flex items-center">
          {/* <AiFillLike /> */}
          <AiOutlineLike /> <span>12</span>
        </button>
        <button className="flex items-center">
          <AiOutlineDislike />
          <span>12</span>
        </button>
      </div>
    </div>
  );
};

export default memo(CommentCard1);
