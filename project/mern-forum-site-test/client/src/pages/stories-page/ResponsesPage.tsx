import ResponseItem from "@/components/common/ResponseItem";
import Paginate from "@/components/form/paginate";
import Loader from "@/components/layout/loader";
import useSearchParamsValue from "@/hook/useSearchParamsValue";
import { useCommentStore } from "@/store/comment-store";
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
          <ResponseItem key={item._id} data={item} />
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
  // return (
  //   <div className="space-y-5">
  //     <div className="flex flex-col items-center gap-3">
  //       <div className="font-semibold">No response.</div>
  //     </div>
  //     <ResponseItem />
  //     <ResponseItem />
  //     <ResponseItem />
  //     <ResponseItem />
  //     <ResponseItem />
  //   </div>
  // );
};

export default ResponsesPage;
