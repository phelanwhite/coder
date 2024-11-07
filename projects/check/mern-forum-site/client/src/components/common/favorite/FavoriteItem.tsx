import IMAGES_DEFAULT from "@/assets/constants/image";
import { Link } from "react-router-dom";
import TopicCard from "../topic/TopicCard";
import { getReadTimeToString, getTimeDisplayBlog } from "@/libs/utils/time";
import BookmarkButtonAddRemove from "../bookmark/BookmarkButtonAddRemove";
import FavoriteItemButtonMenu from "./FavoriteItemButtonMenu";
import { memo } from "react";

const FavoriteItem = ({ data }: { data: any }) => {
  return (
    <div className="p-5 rounded-2xl border shadow-sm">
      <div className="flex gap-6 items-center justify-between">
        <div>
          <Link
            to={`/author/${data?.blog?.author?._id}`}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border">
              <img
                src={
                  data?.blog?.author?.avatar || IMAGES_DEFAULT.account_notfound
                }
                alt=""
                loading="lazy"
              />
            </div>
            <div className="text-xs font-medium">
              {data?.blog?.author?.name}
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <BookmarkButtonAddRemove
            blogId={data?.blog?._id}
            isBookmark={data?.blog?.isBookmark}
          />
          <FavoriteItemButtonMenu data={data} />
          {/* <BlogButtonMenu /> */}
        </div>
      </div>
      <div className="mt-4 flex items-start gap-8">
        <div className="flex-1">
          <div className="line-clamp-2 text-xl font-bold">
            <Link to={`/blog/${data?.blog?._id}`}>{data?.blog?.title}</Link>
          </div>
          <div className="mt-2 line-clamp-3 text-[15px] text-text-secondary-color-2">
            {data?.blog?.content}
          </div>
          <div className="mt-4 text-sm flex flex-wrap gap-2 items-center">
            <span className="font-medium text-text-secondary-color-2">
              {data?.createdAt && getTimeDisplayBlog(new Date(data?.createdAt))}
            </span>
            <span className="mr-4 font-medium text-text-secondary-color-2">
              {getReadTimeToString(data?.description)} phut doc
            </span>
            {data?.topic?.map((item: any) => (
              <TopicCard key={item} data={item} />
            ))}
          </div>
        </div>
        {data?.thumbnail && (
          <div className="hidden md:block w-[200px] max-h-[120px] rounded-xl overflow-hidden">
            <img src={data?.blog?.thumbnail} alt="" loading="lazy" />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(FavoriteItem);
