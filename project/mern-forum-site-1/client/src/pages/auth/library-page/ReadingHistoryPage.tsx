import HistoryItem from "@/components/commons/history/HistoryItem";
import Paginate from "@/components/forms/paginate";
import Loader from "@/components/layouts/loader";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useHistoryStore } from "@/stores/library-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ReadingHistoryPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { history, getHistoryByMe, deleteAllHistoryByMe } = useHistoryStore();
  const getBlogsResult = useQuery({
    queryKey: ["history", searchParams.toString()],
    queryFn: () => getHistoryByMe(searchParams.toString()),
  });
  const historyDeleteResult = useMutation({
    mutationFn: async () => {
      return await deleteAllHistoryByMe();
      getHistoryByMe(searchParams.toString());
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (getBlogsResult.isLoading || historyDeleteResult.isPending)
    return <Loader />;

  if (history.length > 0) {
    return (
      <div className="space-y-5">
        <div className="mb-8 bg-bgSecondaryColor rounded p-4 flex flex-wrap gap-4 items-center justify-between">
          <div>You can clear your reading history for a fresh start.</div>
          <button
            onClick={() => historyDeleteResult.mutate()}
            className="btn-danger text-xs"
          >
            Clear history
          </button>
        </div>
        {history.map((item) => {
          if (item?.type === "blog") {
            return <HistoryItem key={item._id} data={item?.blog} />;
          }
        })}
        <Paginate
          forcePage={Number(getBlogsResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`page`, e.selected + 1)}
          pageCount={getBlogsResult.data?.data?.total_page as number}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">No history</div>
      </div>
    );
  }
};

export default ReadingHistoryPage;
