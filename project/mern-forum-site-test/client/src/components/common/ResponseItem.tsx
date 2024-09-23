import { getDateString } from "@/lib/util/date";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import ResponseItemMenu from "./ResponseItemMenu";

const ResponseItem = ({ data }: { data: any }) => {
  const reading_time = useMemo(() => {
    return Math.ceil(data?.comment.split(" ").length / 200);
  }, [data]);
  return (
    <div className="pb-5 border-b">
      <div className="text-textSecondaryColor line-clamp-2">
        <Link to={`/author-id/${data?.author?._id}`} className="text-link">
          {data?.author?.name}
        </Link>{" "}
        response in articles{" "}
        <Link
          to={`/blog-id/${data?.blog?.slug}/${data?.blog?._id}`}
          className="text-link"
        >
          {data?.blog?.title}
        </Link>
      </div>
      <div className="mt-1 text-base font-bold line-clamp-2">
        {data?.comment}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-textSecondaryColor">
        <div>Published on {getDateString(new Date(data?.createdAt))}</div>
        <span>-</span>
        <div>{reading_time} min read</div>
        <ResponseItemMenu data={data} />
      </div>
    </div>
  );
};

export default memo(ResponseItem);
