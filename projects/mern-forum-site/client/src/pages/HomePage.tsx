import { BlogList1 } from "@/components/common/blog/BlogList";
import axiosConfig from "@/configs/axios-config";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

const HomePage = () => {
  const getBlogsResult = useInfiniteQuery({
    queryKey: ["blogs"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const url = `/blog/get-all?_page=${pageParam}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage?.data?.result?.length) {
        return lastPageParam + 1;
      } else {
        return null;
      }
    },
    placeholderData: keepPreviousData,
  });

  const customBlogsResult = useMemo(() => {
    return (
      getBlogsResult.data?.pages?.map((item) => item?.data?.result).flat() || []
    );
  }, [getBlogsResult.data]);

  return (
    <div className="space-y-4">
      <BlogList1
        isLoading={getBlogsResult.isLoading}
        datas={customBlogsResult}
      />
      <div className="text-center text-xs text-blue-500">
        <button
          onClick={() => {
            getBlogsResult.fetchNextPage({});
          }}
          disabled={
            !getBlogsResult.hasNextPage || getBlogsResult.isFetchingNextPage
          }
        >
          {getBlogsResult.isFetchingNextPage
            ? "Loading more..."
            : getBlogsResult.hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
