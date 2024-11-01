import { Link } from "react-router-dom";
import BlogItemButtonMenu from "./BlogItemButtonMenu";
import { memo } from "react";

const BlogItem = ({ data }: { data: any }) => {
  return (
    <div className="p-5 rounded-2xl border shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex-1 line-clamp-2 text-xl font-bold">
          <Link to={`/blog/${data?._id}`}>{data?.title}</Link>
        </div>
        <BlogItemButtonMenu data={data} />
      </div>
      <div className="text-sm mt-2 flex flex-wrap items-center gap-x-4">
        <div className="text-green-500">
          {data?.updatedAt && new Date(data?.updatedAt).toDateString()}
        </div>
        <div className="text-text-secondary-color-2">
          Tác giả <span className="font-medium">{data?.author?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(BlogItem);
