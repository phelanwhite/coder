import CommentItem from "@/components/common/comment/CommentItem";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useCommentStore } from "@/stores/comment-store";
import { useQuery } from "@tanstack/react-query";

const ResponsesPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { responses, getResponses } = useCommentStore();
  const getResponsesResult = useQuery({
    queryKey: ["comment", searchParams.toString()],
    queryFn: async () => {
      const response = await getResponses(searchParams.toString());
      return response;
    },
  });
  return (
    <div className="p-5 space-y-4">
      {/* <BlogList1
    isLoading={getBookmarksByMeResult.isLoading}
    datas={bookmarks}
  /> */}
      {responses.map((item) => {
        return <CommentItem key={item?._id} data={item} />;
      })}
      {getResponsesResult.data && responses?.length > 0 && (
        <div className="mt-4">
          <Paginate
            forcePage={Number(getResponsesResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getResponsesResult.data?.data?.total_page as number}
          />
        </div>
      )}
    </div>
  );
};

export default ResponsesPage;
