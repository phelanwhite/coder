import SearchResultsList from "@/components/common/SearchResultsList";
import { axiosConfigV1 } from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Author = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const getDatasResult = useQuery({
    queryKey: [`search`, `authors`, searchParams.toString()],
    queryFn: async () => {
      const url = `author/get-authors?${searchParams.toString()}`;
      return (await axiosConfigV1.get(url)).data;
    },
  });
  return (
    <SearchResultsList
      searchType="authors"
      datas={getDatasResult.data?.data?.results}
      onchagePage={(e) => handleSearchParams(`_page`, e.selected + 1)}
      page={getDatasResult?.data?.data?._page}
      pageCount={getDatasResult?.data?.data?.total_pages}
      loading={getDatasResult.isLoading}
    />
  );
};

export default Author;
