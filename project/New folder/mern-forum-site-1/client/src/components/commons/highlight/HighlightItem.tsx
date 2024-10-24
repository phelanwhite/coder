import { getDateString } from "@/libs/utils/date";
import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import HighlightItemMenu from "./HighlightItemMenu";
interface Props {
  data: any;
}
const HighlightItem: FC<Props> = ({ data }) => {
  return (
    <div className="pb-5 border-b">
      <div className="text-textSecondaryColor line-clamp-2">
        <Link to={`/`} className="text-link">
          {data?.author?.name}
        </Link>{" "}
        saved article{" "}
        <Link
          to={`/blog-id/${data?.blog?.slug}/${data?.blog?._id}`}
          className="text-link font-medium"
        >
          {data?.blog?.title}
        </Link>
      </div>
      <div className="mt-1 text-base line-clamp-2">{data?.blog?.content}</div>
      <div className="mt-2 flex items-start justify-between gap-4 text-textSecondaryColor">
        <div className="text-xs space-x-1">
          <span>Published on</span>
          <span>
            {data?.createdAt && getDateString(new Date(data?.createdAt))}
          </span>
        </div>

        <HighlightItemMenu data={data} />
      </div>
    </div>
  );
};

export default memo(HighlightItem);
