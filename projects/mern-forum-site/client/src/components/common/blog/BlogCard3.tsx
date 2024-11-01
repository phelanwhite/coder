import IMAGES_DEFAULT from "@/assets/constants/image";
import { memo } from "react";
import { Link } from "react-router-dom";

const BlogCard3 = ({ data }: { data: any }) => {
  return (
    <div className="">
      <div>
        <Link
          to={`/author/${data?.author?._id}`}
          className="flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-full overflow-hidden border">
            <img
              src={data?.author?.avatar || IMAGES_DEFAULT.account_notfound}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="text-xs font-medium">{data?.author?.name}</div>
        </Link>
      </div>
      <div className="mt-2 line-clamp-2 text-base font-bold">
        <Link to={`/blog/${data?._id}`}>{data?.title}</Link>
      </div>
    </div>
  );
};

export default memo(BlogCard3);
