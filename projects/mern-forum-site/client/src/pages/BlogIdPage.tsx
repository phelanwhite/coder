import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import { BlogCard2 } from "@/components/common/blog/BlogCard";
import BlogCardButtonMenu from "@/components/common/blog/BlogCardButtonMenu";
import BookmarkButtonAddRemove from "@/components/common/bookmark/BookmarkButtonAddRemove";
import CommentCard from "@/components/common/comment/CommentCard";
import CommentForm from "@/components/common/comment/CommentForm";
import CommentList from "@/components/common/comment/CommentList";
import FavoriteButtonAddRemove from "@/components/common/favorite/FavoriteButtonAddRemove";
import TopicCard from "@/components/common/topic/TopicCard";
import axiosConfig from "@/configs/axios-config";
import { getTimeDisplayBlog } from "@/libs/utils/time";
import { useAuthStore } from "@/stores/auth-store";
import { useCommentStore } from "@/stores/comment-store";
import { useHistoryStore } from "@/stores/history-store";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const BlogIdPage = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { createHistory } = useHistoryStore();
  const { total_comment } = useCommentStore();
  const createHistoryResult = useQuery({
    queryKey: ["blog", "id", "history", id],
    queryFn: async () => {
      const response = await createHistory({ blog: id, type: "blog" });
      return response.data;
    },
    enabled: !!(id && user),
  });
  const getBlogIdResult = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const url = `/blog/get-id/${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    enabled: !!id,
  });
  const getSimilarByBlogIdResult = useQuery({
    queryKey: ["blog", "similar", id],
    queryFn: async () => {
      const url = `/blog/get-id/${id}/similar/?_limit=4&_author=${getBlogIdResult.data?.data?.author?._id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    enabled: !!(id && getBlogIdResult.data),
  });

  const blogData = useMemo(
    () => getBlogIdResult?.data?.data,
    [getBlogIdResult.data]
  );

  return (
    <div className="max-w-[800px] w-full mx-auto px-3 space-y-10">
      {/* Detail  */}
      <>
        {/* Title  */}
        <div className=" font-bold text-2xl md:text-[1.875rem]">
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
                <div className="text-xs font-medium text-text-secondary-color-2 flex gap-4 items-center">
                  <span>
                    {blogData?.createdAt &&
                      getTimeDisplayBlog(new Date(blogData?.createdAt))}
                  </span>
                  <span>{blogData?.read_time}</span>
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

            <BlogCardButtonMenu />
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
        {/* article_origin */}
        {blogData?.article_origin && (
          <div>
            <span>Link article: </span>
            <Link
              className="underline text-blue-500"
              to={blogData?.article_origin}
            >
              {blogData?.article_origin}
            </Link>
          </div>
        )}
        {/* Action  */}
        <div className="flex items-center gap-8">
          <FavoriteButtonAddRemove
            blogId={id as string}
            isFavorite={blogData?.isFavorite}
            count_favorite={blogData?.total_favorite}
          />
          <button className="flex items-center gap-1">
            <FaRegCommentAlt />
            <span>{blogData?.total_comment}</span>
          </button>
        </div>
        {/* Topic  */}
        <div className="text-xs flex flex-wrap items-center gap-2">
          {blogData?.topic?.map((item: any) => (
            <TopicCard key={item} data={item} />
          ))}
        </div>
      </>

      {/* Similar articles */}
      <div className="border-t-2 border-t-red-400 pt-6">
        <div className="border-l-[3px] border-green-500 pl-3 font-semibold text-xl mb-8">
          Similar articles
        </div>
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
          {getSimilarByBlogIdResult.data?.data?.result?.map((item: any) => {
            return <BlogCard2 key={item?._id} data={item} />;
          })}
        </div>
      </div>

      {/* Comment */}
      <div className="pt-6">
        <div className="border-l-[3px] border-green-500 pl-3 font-semibold text-xl mb-8">
          Top comment ({total_comment})
        </div>
        <CommentList id={id as string} />
      </div>
    </div>
  );
};

export default BlogIdPage;
