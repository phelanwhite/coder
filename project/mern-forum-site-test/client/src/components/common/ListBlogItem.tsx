import { FC, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { getDateString } from "@/lib/util/date";
import ListBlogItemMenu from "./ListBlogItemMenu";

interface Props {
  data: any;
}

const ListBlogItem: FC<Props> = ({ data }) => {
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
        <ListBlogItemMenu data={data} />
      </div>
    </div>
  );
};

export default memo(ListBlogItem);
