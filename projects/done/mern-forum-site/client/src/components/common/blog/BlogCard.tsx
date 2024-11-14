import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import { Link } from "react-router-dom";
import TopicCard from "../topic/TopicCard";
import BookmarkButtonAddRemove from "../bookmark/BookmarkButtonAddRemove";
import BlogCardButtonMenu from "./BlogCardButtonMenu";
import BlogCardAuthorButtonMenu from "./BlogCardAuthorButtonMenu";
import BlogCardFavoriteButtonMenu from "./BlogCardFavoriteButtonMenu";
import { getTimeDisplay } from "@/libs/utils/time";
import BlogCardNotificationButtonMenu from "./BlogCardNotificationButtonMenu";
import { BlogMenuType } from "@/assets/constants/type";
import BlogCardHistoryButtonMenu from "./BlogCardHistoryButtonMenu";

type TypeCard1 = {
  data: any;
  type?: BlogMenuType;
};

// card 1
export const BlogCard1 = ({ data, type }: TypeCard1) => {
  return (
    <div className="p-5">
      {/* top  */}
      <div className="flex gap-6 items-center justify-between mb-3 sm:mb-3">
        <div>
          <Link
            to={`/author/${data?.author?._id}`}
            className="flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-full overflow-hidden border">
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
          <>
            {type === "author" && <BlogCardAuthorButtonMenu data={data} />}
            {type === "admin" && <BlogCardAuthorButtonMenu data={data} />}
            {type === "favorite" && <BlogCardFavoriteButtonMenu data={data} />}
            {type === "bookmark" && <BlogCardButtonMenu data={data} />}
            {type === "history" && <BlogCardHistoryButtonMenu data={data} />}
            {type === "notification" && (
              <BlogCardNotificationButtonMenu data={data} />
            )}
            {!type && <BlogCardButtonMenu data={data} />}
          </>
        </div>
      </div>
      {/* content  */}
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <div className="line-clamp-2 text-xl font-bold">
            <Link to={`/blog/${data?._id}`}>{data?.title}</Link>
          </div>
          <div className="mt-2 line-clamp-3 text-text-secondary-color-2">
            {data?.content}
          </div>
        </div>
        {data?.thumbnail && (
          <Link to={`/blog/${data?._id}`}>
            <div className="aspect-video w-20 sm:w-40 rounded overflow-hidden ">
              <img src={data?.thumbnail} alt="" loading="lazy" />
            </div>
          </Link>
        )}
      </div>
      {/* footer  */}
      <div className="mt-3 flex flex-wrap gap-2 items-center text-xs">
        <span className="font-medium text-text-secondary-color-2">
          {data?.createdAt && getTimeDisplay(new Date(data?.createdAt))}
        </span>
        <span className="font-medium text-text-secondary-color-2">
          {data?.read_time}
        </span>
        <span className="mr-4 font-medium text-text-secondary-color-2">
          {data?.total_comment} comment
        </span>
        {data?.topic?.map((item: any) => (
          <TopicCard key={item} data={item} />
        ))}
      </div>
    </div>
  );
};
export const BlogCard1Skeleton = () => {
  return (
    <div className="p-5">
      <Skeleton width={28} height={28} circle />
      <div className="mt-4 flex items-start gap-4">
        <div className="w-full">
          <Skeleton />
          <Skeleton className="mt-2" />
          <Skeleton count={1} className="mt-4" />
        </div>
        <Skeleton className="aspect-thumbnail h-12 w-20 sm:h-28 sm:w-52" />
      </div>
    </div>
  );
};

// card 2
export const BlogCard2 = ({ data }: { data: any }) => {
  return (
    <div className="">
      <div className="flex gap-6 items-center justify-between">
        <div>
          <Link
            to={`/author/${data?.author?._id}`}
            className="flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-full overflow-hidden border">
              <img
                src={data?.author?.avatar || IMAGES_DEFAULT.account_notfound}
                alt=""
                loading="lazy"
              />
            </div>
            <div className="text-xs font-medium">{data?.author?.name}</div>
          </Link>
        </div>
        {/* <div className="flex items-center gap-3">
          <BookmarkButtonAddRemove
            blogId={data?._id}
            isBookmark={data?.isBookmark}
          />
          <BlogButtonMenu />
        </div> */}
      </div>
      <div className="mt-2 line-clamp-2 h-[52px] text-xl font-bold">
        <Link to={`/blog/${data?._id}`}>{data?.title}</Link>
      </div>
      {data?.thumbnail && (
        <Link
          to={`/blog/${data?._id}`}
          className="mt-2 block rounded overflow-hidden sm:h-[150px]"
        >
          <img
            src={data?.thumbnail || IMAGES_DEFAULT.thumbnail_notFound}
            alt=""
            loading="lazy"
          />
        </Link>
      )}
      <div className="mt-2 line-clamp-3 text-sm text-text-secondary-color-2">
        {data?.content}
      </div>
    </div>
  );
};

// card 3
export const BlogCard3 = ({ data }: { data: any }) => {
  return (
    <div className="">
      <div>
        <Link
          to={`/author/${data?.author?._id}`}
          className="flex items-center gap-2"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden border">
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
