import { BlogCard1 } from "@/components/common/blog/BlogCard";
import { BlogList1 } from "@/components/common/blog/BlogList";
import Paginate from "@/components/layout/paginate";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";

const SearchPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const getBlogsResult = useQuery({
    queryKey: ["blogs", "search", searchParams.toString()],
    queryFn: async () => {
      const url = `blog/get-all?${searchParams.toString()}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="px-4 text-2xl font-medium text-text-secondary-color-2 mb-8">
        Results for{" "}
        <span className="text-black">
          {searchParams.get(`_q`) || searchParams.get(`_topic`)}
        </span>
      </div>
      <div>
        <BlogList1
          isLoading={getBlogsResult.isLoading}
          datas={getBlogsResult.data?.data?.result}
        />
        {getBlogsResult.data && (
          <div className="mt-4">
            <Paginate
              forcePage={Number(getBlogsResult.data?.data?._page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={getBlogsResult.data?.data?.total_page as number}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
