import CommentItem from "@/components/commons/comment/CommentItem";
import Paginate from "@/components/forms/paginate";
import Loader from "@/components/layouts/loader";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useCommentStore } from "@/stores/comment-store";
import { useQuery } from "@tanstack/react-query";

const ResponsesPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();

  const { comments, getCommentsByMe } = useCommentStore();
  const getResponsesResult = useQuery({
    queryKey: ["you-responses", comments, searchParams.toString()],
    queryFn: async () => {
      const response = await getCommentsByMe(searchParams.toString());
      return response;
    },
  });

  if (getResponsesResult.isLoading) return <Loader />;

  if (comments.length > 0) {
    return (
      <div className="space-y-5">
        {comments.map((item) => (
          <CommentItem key={item._id} data={item} />
        ))}
        <Paginate
          forcePage={Number(getResponsesResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`page`, e.selected + 1)}
          pageCount={getResponsesResult.data?.data?.total_page as number}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">No response.</div>
      </div>
    );
  }
};

export default ResponsesPage;
