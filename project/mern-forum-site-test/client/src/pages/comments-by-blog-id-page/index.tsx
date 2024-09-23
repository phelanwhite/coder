import CommentCard from "@/components/common/CommentCard";
import CommentForm from "@/components/form/CommentForm";
import Paginate from "@/components/form/paginate";
import Loader from "@/components/layout/loader";
import axiosConfig from "@/config/axios-config";
import useSearchParamsValue from "@/hook/useSearchParamsValue";
import { useCommentStore } from "@/store/comment-store";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const CommentByBlogIdPage = () => {
  const { id } = useParams();
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { comments, getCommentsByBlogId } = useCommentStore();
  const getCommentsByBlogIdResult = useQuery({
    queryKey: ["comments-by-blog-id", id, searchParams.toString()],
    queryFn: async () => {
      const response = await getCommentsByBlogId(id, searchParams.toString());
      return response;
    },
    enabled: !!id,
  });
  // blog
  const getBlogByIdResult = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const url = `blog/get-id/${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  const blogData = useMemo(
    () => getBlogByIdResult.data?.data,
    [getBlogByIdResult]
  );

  if (getBlogByIdResult.isLoading || getCommentsByBlogIdResult.isLoading)
    return <Loader />;

  return (
    <div className="space-y-6 max-w-[748px] w-full mx-auto px-6">
      <div className="title">{blogData?.title}</div>
      {blogData?.content && (
        <div className="border-l-blue-400 bg-gray-100 border-l-4 p-4 py-2 italic whitespace-pre-wrap text-base">
          {blogData?.content}
        </div>
      )}
      <div>
        <button
          className="text-link text-blue-500"
          onClick={() => window.history.back()}
        >
          Read full post
        </button>
      </div>
      <CommentForm blogId={id as string} />
      {comments.length > 0 ? (
        <>
          {comments?.map((item: any) => (
            <CommentCard key={item?._id} data={item} />
          ))}
          <Paginate
            forcePage={Number(getCommentsByBlogIdResult.data?.data?.page) - 1}
            onPageChange={(e) => handleSearchParams(`page`, e.selected + 1)}
            pageCount={
              getCommentsByBlogIdResult.data?.data?.total_page as number
            }
          />
        </>
      ) : (
        <div>No comment</div>
      )}
    </div>
  );
};

export default CommentByBlogIdPage;
