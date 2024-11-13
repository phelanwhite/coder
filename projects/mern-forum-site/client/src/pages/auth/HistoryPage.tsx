import { BlogCard1 } from "@/components/common/blog/BlogCard";
import { BlogList1 } from "@/components/common/blog/BlogList";
import Loader from "@/components/layout/loader";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useHistoryStore } from "@/stores/history-store";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const HistoryPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { histories, deleteHistoriesByMe, getHistoriesByMe } =
    useHistoryStore();

  const getHistoriesByMeResult = useQuery({
    queryKey: ["me", "histories", searchParams.toString()],
    queryFn: async () => {
      return getHistoriesByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  const historiesDeleteResult = useMutation({
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

  if (historiesDeleteResult.isPending) return <Loader />;

  return (
    <div>
      {getHistoriesByMeResult.data && histories?.length > 0 && (
        <div className="mb-4 bg-bgSecondaryColor rounded p-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="text-text-secondary-color-2">
            You can clear your reading history for a fresh start.
          </div>
          <button
            onClick={() => historiesDeleteResult.mutate()}
            className="btn btn-danger rounded-full text-xs"
          >
            Clear history
          </button>
        </div>
      )}
      <div>
        <BlogList1
          isLoading={getHistoriesByMeResult.isLoading}
          datas={histories}
          type="history"
        />
        {getHistoriesByMeResult.data && histories?.length > 0 && (
          <div className="mt-4">
            <Paginate
              forcePage={Number(getHistoriesByMeResult.data?.data?._page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={
                getHistoriesByMeResult.data?.data?.total_page as number
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
