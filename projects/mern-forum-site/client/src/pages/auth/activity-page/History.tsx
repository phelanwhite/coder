import MyQueriesResultList from "@/components/common/MyQueriesResultList";
import ButtonComponent from "@/components/form/button-component";
import Loader from "@/components/form/loader";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useHistoryStore } from "@/stores/history-store";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

const History = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { histories, getHistoriesByMe, deleteHistoriesByMe } =
    useHistoryStore();
  const deleteHistoriesByMeResult = useMutation({
    mutationFn: async () => {
      return await deleteHistoriesByMe();
    },
    onSuccess(data) {
      toast.success(data?.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  const handleDeleteHistories = useCallback(() => {
    if (confirm(`Are you sure you want to delete`)) {
      deleteHistoriesByMeResult.mutate();
    }
  }, []);
  const getDatasResult = useQuery({
    queryKey: [`me`, `historie`, searchParams.toString()],
    queryFn: async () => {
      return await getHistoriesByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      {deleteHistoriesByMeResult.isPending && <Loader />}
      {getDatasResult?.data?.data?.total_pages > 0 && histories.length > 0 && (
        <div className="px-5 mb-10 flex items-center justify-between gap-4 flex-wrap text-sm">
          <span className="text-text-secondary-color">
            You can clear your reading history for a fresh start.
          </span>
          <ButtonComponent
            onClick={handleDeleteHistories}
            color="error"
            className="rounded-full"
            size="xs"
          >
            Clear history
          </ButtonComponent>
        </div>
      )}
      <MyQueriesResultList
        menuType="History"
        loading={getDatasResult.isLoading}
        datas={histories}
        onchagePage={(e) => handleSearchParams(`_page`, e.selected + 1)}
        page={getDatasResult?.data?.data?._page}
        pageCount={getDatasResult?.data?.data?.total_pages}
      />
    </div>
  );
};

export default History;
