import IMAGES_DEFAULT from "@/assets/constants/image";
import { memo } from "react";
import { Link } from "react-router-dom";
import BlogButtonMenu from "./BlogButtonMenu";
import BookmarkButtonAddRemove from "../bookmark/BookmarkButtonAddRemove";

const BlogCard2 = ({ data }: { data: any }) => {
  return (
    <div className="">
      <div className="flex gap-6 items-center justify-between">
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
        <div className="flex items-center gap-3">
          <BookmarkButtonAddRemove
            blogId={data?._id}
            isBookmark={data?.isBookmark}
          />
          <BlogButtonMenu />
        </div>
      </div>
      <div className="mt-2 line-clamp-2 text-xl font-bold">
        <Link to={`/blog/${data?._id}`}>{data?.title}</Link>
      </div>
      {data?.thumbnail && (
        <div className="mt-2 rounded-xl overflow-hidden sm:h-[200px]">
          <img
            src={data?.thumbnail || IMAGES_DEFAULT.thumbnail_notFound}
            alt=""
            loading="lazy"
          />
        </div>
      )}
      <div className="mt-2 line-clamp-3 text-sm text-text-secondary-color-2">
        {data?.content}
      </div>
    </div>
  );
};

export default memo(BlogCard2);
