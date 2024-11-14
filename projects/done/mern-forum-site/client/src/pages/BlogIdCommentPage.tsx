import CommentCardList from "@/components/common/comment/CommentCardList";
import CommentForm from "@/components/common/comment/CommentForm";
import Paginate from "@/components/layout/paginate";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useCommentStore } from "@/stores/comment-store";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogIdCommentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { comments, getCommentsByBlogId } = useCommentStore();
  const getCommentByBlogIdResult = useQuery({
    queryKey: ["blog", "comment", id, searchParams.toString()],
    queryFn: async () => {
      return getCommentsByBlogId(id as string, searchParams.toString());
    },
    enabled: !!id,
  });
  const getBlogIdResult = useQuery({
    queryKey: ["blog", "id", id],
    queryFn: async () => {
      const response = await axiosConfig.get(`/blog/get-id/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
  const blogData = useMemo(
    () => getBlogIdResult?.data?.data,
    [getBlogIdResult.data]
  );

  return (
    <div className="max-w-[800px] w-full mx-auto px-3 space-y-10">
      {/* Title  */}
      <div className="font-bold text-2xl md:text-[1.875rem]">
        {blogData?.title}
      </div>
      {/* content */}
      {blogData?.content && (
        <div className="border-l-blue-400 bg-gray-100 border-l-4 p-4 py-2 italic whitespace-pre-wrap text-base">
          {blogData?.content}
        </div>
      )}
      <button
        className="text-link text-blue-500"
        onClick={() => navigate(`/blog/${id}`)}
      >
        Read full post
      </button>
      <div className="space-y-6">
        <CommentForm type_id={id as string} type="blog" />
        <CommentCardList
          datas={comments}
          isLoading={getCommentByBlogIdResult.isLoading}
        />
        {getCommentByBlogIdResult.data && comments?.length > 0 && (
          <div className="mt-4">
            <Paginate
              forcePage={Number(getCommentByBlogIdResult.data?.data?._page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={
                getCommentByBlogIdResult.data?.data?.total_page as number
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogIdCommentPage;
