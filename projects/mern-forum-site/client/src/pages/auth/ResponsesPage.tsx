import { CommentItem } from "@/components/common/comment/CommentItem";
import CommentItemList from "@/components/common/comment/CommentItemList";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useCommentStore } from "@/stores/comment-store";
import { useQuery } from "@tanstack/react-query";

const ResponsesPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { responses, getResponses } = useCommentStore();
  const getResponsesResult = useQuery({
    queryKey: ["me", "response", searchParams.toString()],
    queryFn: async () => {
      const response = await getResponses(searchParams.toString());
      return response;
    },
  });
  return (
    <div className="px-5 space-y-4">
      <CommentItemList
        datas={responses}
        isLoading={getResponsesResult.isLoading}
      />
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
