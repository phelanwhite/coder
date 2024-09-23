import { images } from "@/assets/constants";
import { getDateString } from "@/lib/util/date";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";

export const BlogCard1 = ({ data }: { data: any }) => {
  return (
    <div className="pb-5 border-b">
      {/* author  */}
      <div className="mb-4 text-[13px] flex items-center gap-1">
        <div className="w-5 h-5 overflow-hidden rounded-full bg-red-500">
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
      {/* detail  */}
      <Link to={`/blog-id/${data?.slug}/${data?._id}`}>
        <div className="flex items-start gap-6 md:gap-14">
          {/* left  */}
          <div>
            {/* title  */}
            <div className="text-link text-xl md:text-2xl font-bold line-clamp-3 leading-6">
              {data?.title}
            </div>
            {/* content */}
            <div className="mt-2 text-base line-clamp-2 leading-5 text-textSecondaryColor">
              {data?.content}
            </div>
            {/* action  */}
            <div className="mt-4 text-[13px] flex items-center gap-3 text-textSecondaryColor">
              <span>{getDateString(new Date(data?.createdAt))}</span>
              <div className="flex items-center gap-1">
                <BiSolidLike />
                <span>{data?.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaComment />
                <span>{data?.count_comment}</span>
              </div>
            </div>
          </div>
          {/* right  */}
          {data?.thumbnail && (
            <div>
              {/* thumbnail */}
              <div className="aspect-video w-[80px] md:w-[160px]">
                <img src={data?.thumbnail} loading="lazy" alt="" />
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export const BlogCard2 = ({ data }: { data: any }) => {
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
