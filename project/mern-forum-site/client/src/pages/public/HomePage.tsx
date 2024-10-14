import BlogCard1 from "@/components/common/blog/BlogCard1";
import Loader from "@/components/common/loader";
import SidebarRight from "@/components/layout/SidebarRight";
import axiosConfig from "@/configs/axios-config";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const HomePage = () => {
  const getBlogsResult = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: async ({ pageParam }) => {
      const url = `blog/get-all?_page=${pageParam}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage?.data?.result?.length) {
        return lastPageParam + 1;
      } else {
        return undefined;
      }
    },
    placeholderData: keepPreviousData,
  });

  if (getBlogsResult.isPending) return <Loader />;

  return (
    <div className="flex max-w-[1332px] w-full mx-auto px-3 ">
      {/* Left  */}
      <div className="flex-1 space-y-4">
        {getBlogsResult.data?.pages?.map((item: any) => {
          return item?.data?.result?.map((blog: any) => {
            return <BlogCard1 key={blog?._id} data={blog} />;
          });
        })}
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
      {/* Right  */}
      <SidebarRight />
    </div>
  );
};

export default HomePage;
