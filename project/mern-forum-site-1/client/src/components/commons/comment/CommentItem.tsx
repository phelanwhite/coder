import { getDateString } from "@/libs/utils/date";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import CommentItemMenu from "./CommentItemMenu";

const CommentItem = ({ data }: { data: any }) => {
  const reading_time = useMemo(() => {
    return Math.ceil(data?.comment.split(" ").length / 200);
  }, [data]);
  return (
    <div className="pb-4 border-b">
      <div className="text-textSecondaryColor line-clamp-2">
        <Link to={`/author-id/${data?.author?._id}`} className="text-link">
          {data?.author?.name}
        </Link>{" "}
        response in articles{" "}
        <Link
          to={`/blog-id/${data?.blog?.slug}/${data?.blog?._id}`}
          className="text-link font-medium"
        >
          {data?.blog?.title}
        </Link>
      </div>
      <div className="mt-1 text-base font-bold line-clamp-2">
        {data?.comment}
      </div>
      <div className="mt-2 flex items-start justify-between gap-4 text-textSecondaryColor">
        <div className="text-xs space-x-1">
          <span>Published on</span>
          <span>
            {data?.createdAt && getDateString(new Date(data?.createdAt))}
          </span>
          <span>-</span>
          <span>{reading_time} min read</span>
        </div>

        <CommentItemMenu data={data} />
      </div>
    </div>
  );
};

export default memo(CommentItem);
