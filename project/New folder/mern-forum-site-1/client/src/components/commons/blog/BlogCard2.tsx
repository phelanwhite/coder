import { images } from "@/assets/constants";
import { memo } from "react";
import { Link } from "react-router-dom";

const BlogCard2 = ({ data }: { data: any }) => {
  return (
    <div>
      {/* author  */}
      <div className="mb-2 text-[13px] flex items-center gap-1">
        <div className="w-5 h-5 overflow-hidden rounded-full">
          <img
            src={data?.author?.avatar || images.account_notfound}
            loading="lazy"
            alt=""
          />
        </div>
        <Link to={`/author-id/${data?.author?._id}`} className="text-link">
          {data?.author?.name}
        </Link>
      </div>
      {/* title  */}
      <Link to={`/blog-id/${data?.slug}/${data?._id}`}>
        <div className="text-link text-base font-bold line-clamp-3 leading-5">
          {data?.title}
        </div>
      </Link>
    </div>
  );
};

export default memo(BlogCard2);
