import { images } from "@/assets/constants";
import { getDateString } from "@/libs/utils/date";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const CommentCard = ({ data }: { data: any }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-7 h-7 overflow-hidden rounded-full border">
        <img
          src={data?.author?.avatar || images.account_notfound}
          loading="lazy"
          alt=""
        />
      </div>
      <div className="flex-1 space-y-1">
        <div className="font-medium">
          <Link to={`/author-id/${data?.author?._id}`} className="text-link">
            {data?.author?.name}
          </Link>
        </div>
        <div className="bg-bgSecondaryColor p-2 rounded space-y-1">
          <div className="text-xs text-textSecondaryColor">
            {getDateString(new Date(data?.createdAt))}
          </div>
          <div>{data?.comment}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(CommentCard);
