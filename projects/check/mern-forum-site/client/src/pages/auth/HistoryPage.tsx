import BlogCard1 from "@/components/common/blog/BlogCard1";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useHistoryStore } from "@/stores/history-store";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

const HistoryPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { getHistoriesByMe, histories, deleteHistoriesByMe } =
    useHistoryStore();

  const getHistoriesByMeResult = useQuery({
    queryKey: ["histories", "me", searchParams.toString()],
    queryFn: async () => {
      return getHistoriesByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  const historyDeleteResult = useMutation({
    mutationFn: async () => {
      return deleteHistoriesByMe();
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (getHistoriesByMeResult.isPending) return <Loader />;

  return (
    <div>
      {histories?.length > 0 ? (
        <>
          <div className="mb-8 bg-bgSecondaryColor rounded p-4 flex flex-wrap gap-4 items-center justify-between">
            <div className="text-text-secondary-color-2">
              You can clear your reading history for a fresh start.
            </div>
            <button
              onClick={() => historyDeleteResult.mutate()}
              className="btn btn-danger rounded-full text-xs"
            >
              Clear history
            </button>
          </div>
          <div className="space-y-4">
            {histories?.map((item: any) => {
              return <BlogCard1 key={item._id} data={item?.blog} />;
            })}
            <Paginate
              forcePage={Number(getHistoriesByMeResult.data?.data?.page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={
                getHistoriesByMeResult.data?.data?.total_page as number
              }
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="font-semibold">No history.</div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
