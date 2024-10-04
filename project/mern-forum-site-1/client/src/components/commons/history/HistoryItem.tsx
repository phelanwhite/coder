import { getDateString } from "@/libs/utils/date";
import React, { FC } from "react";
import { Link } from "react-router-dom";
interface Props {
  data: any;
}
const HistoryItem: FC<Props> = ({ data }) => {
  return (
    <div className="pb-4 border-b">
      <div className="text-base font-bold line-clamp-2 text-link">
        <Link to={`/blog-id/${data?.slug}/${data?._id}`}>{data?.title}</Link>
      </div>
      {data?.content && (
        <div className="mt-1 text-base text-textSecondaryColor line-clamp-2">
          {data?.content}
        </div>
      )}
      <div className="mt-2 flex items-start justify-between gap-4 text-textSecondaryColor">
        <div className="text-xs space-x-1">
          <span>Published on</span>
          <span>
            {data?.createdAt && getDateString(new Date(data?.createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
