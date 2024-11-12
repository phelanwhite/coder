import { TopicList } from "@/components/common/topic/TopicList";
import Paginate from "@/components/layout/paginate";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";

const TopicPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    _limit: "100",
  });
  const getTopicsResult = useQuery({
    queryKey: ["topics", searchParams.toString()],
    queryFn: async () => {
      const url = `topic/get-all?${searchParams.toString()}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="px-4">
      <div>
        <div className="text-xs">
          <TopicList
            isLoading={getTopicsResult.isLoading}
            datas={getTopicsResult.data?.data?.result?.map(
              (item: any) => item?.value
            )}
          />
        </div>
        {getTopicsResult.data && (
          <div className="mt-4">
            <Paginate
              forcePage={Number(getTopicsResult.data?.data?._page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={getTopicsResult.data?.data?.total_page as number}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
