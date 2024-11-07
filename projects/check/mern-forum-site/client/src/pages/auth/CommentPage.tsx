import CommentItem from "@/components/common/comment/CommentItem";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useCommentStore } from "@/stores/comment-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const CommentPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { comments, getCommentsByMe } = useCommentStore();
  const commentByMeResult = useQuery({
    queryKey: ["comments", "me", comments.length, searchParams.toString()],
    queryFn: async () => {
      return await getCommentsByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  if (commentByMeResult.isLoading) return <Loader />;

  if (comments.length > 0) {
    return (
      <div className="space-y-4">
        {comments.map((item) => (
          <div
            key={item._id}
            className="pb-4 border-b last:pb-0 last:border-b-0"
          >
            <CommentItem data={item} />
          </div>
        ))}
        <Paginate
          forcePage={Number(commentByMeResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
          pageCount={commentByMeResult.data?.data?.total_page as number}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">No comment.</div>
      </div>
    );
  }
};

export default CommentPage;
