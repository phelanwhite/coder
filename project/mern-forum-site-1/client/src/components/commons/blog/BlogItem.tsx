import { getDateString } from "@/libs/utils/date";
import { FC, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import BlogItemMenu from "./BlogItemMenu";

interface Props {
  isDraft?: boolean;
  data: any;
}

const BlogItem: FC<Props> = ({ isDraft, data }) => {
  const count_word = useMemo(() => {
    return data?.description?.split(" ").length;
  }, [data]);
  const reading_time_blog = useMemo(() => {
    return Math.ceil(data?.description?.split(" ").length / 200);
  }, [data]);

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
          <span>-</span>
          <span>
            {reading_time_blog} min read ({count_word} words) so far
          </span>
        </div>

        <BlogItemMenu isDraft={isDraft} data={data} />
      </div>
    </div>
  );
};

export default memo(BlogItem);
