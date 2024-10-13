import BlogItem from "@/components/common/blog/BlogItem";
import CommentItem from "@/components/common/comment/CommentItem";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useBlogStore } from "@/stores/blog-store";
import { useCommentStore } from "@/stores/comment-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const ResponsesPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { comments, getResponsesByBlogs } = useCommentStore();
  const getResponsesByBlogsResult = useQuery({
    queryKey: [
      "comment",
      "responses",
      comments.length,
      searchParams.toString(),
    ],
    queryFn: async () => {
      return await getResponsesByBlogs(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  if (getResponsesByBlogsResult.isPending) return <Loader />;
  if (comments.length > 0) {
    return (
      <div className="space-y-4">
        {comments.map((item) => {
          return <CommentItem key={item._id} data={item} />;
        })}
        <Paginate
          forcePage={Number(getResponsesByBlogsResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
          pageCount={getResponsesByBlogsResult.data?.data?.total_page as number}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">No responses.</div>
      </div>
    );
  }
};

export default ResponsesPage;
