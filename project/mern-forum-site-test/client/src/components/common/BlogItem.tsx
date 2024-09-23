import { FC, memo, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getDateString } from "@/lib/util/date";
import BlogItemMenu from "./BlogItemMenu";

interface Props {
  isList?: boolean;
  isDraft?: boolean;
  data: any;
}

const BlogItem: FC<Props> = ({ isDraft, isList, data }) => {
  const count_word = useMemo(() => {
    return data?.description?.split(" ").length;
  }, [data]);
  const reading_time_blog = useMemo(() => {
    return Math.ceil(data?.description?.split(" ").length / 200);
  }, [data]);

  return (
    <div className="pb-5 border-b">
      <div className="text-base font-bold line-clamp-2 text-link">
        <Link to={`/blog-id/${data?.slug}/${data?._id}`}>{data?.title}</Link>
      </div>
      {data?.content && (
        <div className="mt-1 text-base text-textSecondaryColor line-clamp-2">
          {data?.content}
        </div>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-textSecondaryColor">
        <div>{getDateString(new Date(data?.createdAt))}</div>
        <span>-</span>
        <div>
          {reading_time_blog} min read ({count_word} words) so far
        </div>
        {/* {isList && <div>{data?.author?.name}</div>} */}
        <BlogItemMenu isDraft={isDraft} data={data} />
      </div>
    </div>
  );
};

export default memo(BlogItem);
