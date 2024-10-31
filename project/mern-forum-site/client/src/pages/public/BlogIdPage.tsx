import IMAGES_DEFAULT from "@/assets/constants/image";
import BlogCard2 from "@/components/common/blog/BlogCard2";
import BlogButtonMenu from "@/components/common/blog/BlogButtonMenu";
import { Link, useParams } from "react-router-dom";
import TopicCard from "@/components/common/topic/TopicCard";
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "@/configs/axios-config";
import Loader from "@/components/common/loader";
import { useMemo } from "react";
import { getReadTimeToString, getTimeDisplayBlog } from "@/libs/utils/time";
import { useAuthStore } from "@/stores/auth-store";
import BookmarkButtonAddRemove from "@/components/common/bookmark/BookmarkButtonAddRemove";
import FavoriteButtonAddRemove from "@/components/common/favorite/FavoriteButtonAddRemove";
import CommentListByBlogId from "@/components/common/comment/CommentListByBlogId";
import { FaRegCommentAlt } from "react-icons/fa";
import { useHistoryStore } from "@/stores/history-store";
import { useCommentStore } from "@/stores/comment-store";

const BlogIdPage = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { createHistory } = useHistoryStore();
  const { total_comments } = useCommentStore();

  const getBlogIdResult = useQuery({
    queryKey: ["blog", "id", id],
    queryFn: async () => {
      (await axiosConfig.put(`/blog/incriment-view/${id}`)).data;
      const response = await axiosConfig.get(`/blog/get-id/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const blogData = useMemo(
    () => getBlogIdResult?.data?.data,
    [getBlogIdResult.data]
  );

  const getSimilarByBlogIdResult = useQuery({
    queryKey: ["blog", "id", "similar", id],
    queryFn: async () => {
      const response = await axiosConfig.get(
        `/blog/get-id/${id}/similar/?_limit=4`
      );
      return response.data;
    },
    enabled: !!id,
  });

  const createHistoryResult = useQuery({
    queryKey: ["blog", "id", "history", id],
    queryFn: async () => {
      const response = await createHistory({ blog: id });
      return response.data;
    },
    enabled: !!id && !!user,
  });

  if (
    getBlogIdResult.isPending ||
    getSimilarByBlogIdResult.isLoading ||
    createHistoryResult.isLoading
  )
    return <Loader />;

  return (
    <div className="max-w-[800px] w-full mx-auto px-3 space-y-10">
      {/* Detail  */}
      <div className="space-y-7">
        {/* Title  */}
        <div className="mt-10 font-bold text-2xl md:text-[1.875rem]">
          {blogData?.title}
        </div>
        {/* Top */}
        <div className="flex items-center justify-between gap-6">
          {/* Auth  */}
          <div>
            <Link
              to={`/author/${blogData?.author?._id}`}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border">
                <img
                  src={
                    blogData?.author?.avatar || IMAGES_DEFAULT.account_notfound
                  }
                  alt=""
                  loading="lazy"
                />
              </div>
              <div>
                <div className="text-base font-medium">
                  {blogData?.author?.name}
                </div>
                <div className="text-sm font-medium text-text-secondary-color-2 flex gap-4 items-center">
                  <span>
                    {getTimeDisplayBlog(new Date(blogData?.createdAt))}
                  </span>
                  <span>
                    {getReadTimeToString(blogData?.description)} min read
                  </span>
                </div>
              </div>
            </Link>
          </div>
          {/* Action  */}
          <div className="flex items-center gap-3">
            <BookmarkButtonAddRemove
              blogId={id as string}
              isBookmark={blogData?.isBookmark}
            />

            <BlogButtonMenu />
          </div>
        </div>
        {/* content */}
        {blogData?.content && (
          <div className="border-l-blue-400 bg-gray-100 border-l-4 p-4 py-2 italic whitespace-pre-wrap text-base">
            {blogData?.content}
          </div>
        )}
        {/* Thumbnail  */}
        {blogData?.thumbnail && (
          <div className="w-full overflow-hidden">
            <img
              src={blogData.thumbnail || IMAGES_DEFAULT.thumbnail_notFound}
              alt=""
              loading="lazy"
            />
          </div>
        )}

        {/* description  */}
        <div className="text-base space-y-6 overflow-hidden">
          <div className="ql-snow">
            <div
              className="ql-editor p-0 leading-8"
              dangerouslySetInnerHTML={{ __html: blogData?.description }}
            ></div>
          </div>
        </div>
        {/* Action  */}
        <div className="flex items-center gap-8">
          <FavoriteButtonAddRemove
            blogId={id as string}
            favorite={blogData?.favorite}
          />
          <button className="flex items-center gap-1">
            <FaRegCommentAlt />
            <span>{total_comments}</span>
          </button>
        </div>
        {/* Topic  */}
        <div className="text-sm flex flex-wrap items-center gap-2">
          {blogData?.topic?.map((item: any) => (
            <TopicCard key={item} data={item} />
          ))}
        </div>
      </div>
      {/* Comment */}
      <CommentListByBlogId id={id as string} />

      {/* Similar articles */}
      <div className="border-t-2 border-t-red-400 pt-6">
        <div className="font-semibold text-xl mb-8">Similar articles</div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          {getSimilarByBlogIdResult.data?.data?.result?.map((item: any) => {
            return (
              <div
                key={item?._id}
                className="border-b pb-8 last:border-none last:pb-0"
              >
                <BlogCard2 data={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogIdPage;
