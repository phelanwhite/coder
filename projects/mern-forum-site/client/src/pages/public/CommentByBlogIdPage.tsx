import CommentCard from "@/components/common/comment/CommentCard";
import CommentCard1 from "@/components/common/comment/CommentCard1";
import CommentForm from "@/components/common/comment/CommentForm";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useCommentStore } from "@/stores/comment-store";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CommentByBlogIdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { comments, getCommentsByPostId } = useCommentStore();
  const getCommentByBlogIdResult = useQuery({
    queryKey: ["blog", "id", "comment", id, searchParams.toString()],
    queryFn: async () => {
      return getCommentsByPostId(id as string, searchParams.toString());
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

  if (getCommentByBlogIdResult.isLoading) return <Loader />;

  return (
    <div className="max-w-[800px] w-full mx-auto px-3 space-y-10">
      {/* Title  */}
      <div className="mt-10 font-bold text-2xl md:text-[1.875rem]">
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
        <CommentForm blogId={id as string} />
        {comments.length > 0 ? (
          <>
            {comments?.map((item: any) => {
              return <CommentCard key={item._id} data={item} />;
            })}
            <Paginate
              forcePage={Number(getCommentByBlogIdResult.data?.data?.page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={
                getCommentByBlogIdResult.data?.data?.total_page as number
              }
            />
          </>
        ) : (
          <div>No Comment</div>
        )}
      </div>
    </div>
  );
};

export default CommentByBlogIdPage;
