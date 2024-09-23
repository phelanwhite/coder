import { getDateString } from "@/lib/util/date";
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
          to={`/blog-id/${data?.type_id?.slug}/${data?.type_id?._id}`}
          className="text-link"
        >
          {data?.type_id?.title}
        </Link>
      </div>
      <div className="mt-1 text-base line-clamp-2">
        {data?.type_id?.content}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-textSecondaryColor">
        <div>Published on {getDateString(new Date(data?.createdAt))}</div>

        <HighlightItemMenu data={data} />
      </div>
    </div>
  );
};

export default memo(HighlightItem);
