import BlogCard1 from "@/components/common/blog/BlogCard1";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import SidebarRight from "@/components/layout/SidebarRight";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

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

  if (getBlogsResult.isPending) <Loader />;
  return (
    <div className="flex max-w-[1332px] w-full mx-auto px-3 ">
      {/* Left  */}
      <div className="flex-1 ">
        <div className="text-2xl font-medium text-text-secondary-color-2 mb-8">
          Results for{" "}
          <span className="text-black">{searchParams.get(`_q`)}</span>
        </div>
        {getBlogsResult?.data?.data?.result?.length > 0 ? (
          <div className="space-y-4">
            {getBlogsResult.data?.data?.result?.map((item: any) => (
              <BlogCard1 key={item?._id} data={item} />
            ))}
            <Paginate
              forcePage={Number(getBlogsResult.data?.data?.page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={getBlogsResult.data?.data?.total_page as number}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="font-semibold">No results.</div>
          </div>
        )}
      </div>
      {/* Right  */}
      <SidebarRight />
    </div>
  );
};

export default SearchPage;
