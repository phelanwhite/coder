import BlogCard1 from "@/components/common/blog/BlogCard1";
import Loader from "@/components/common/loader";
import TopicCard from "@/components/common/topic/TopicCard";
import Paginate from "@/components/form/paginate";
import SidebarRight from "@/components/layout/SidebarRight";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const TopicPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    _limit: `200`,
  });
  const getTopicsResult = useQuery({
    queryKey: ["topic", searchParams.toString()],
    queryFn: async () => {
      const url = `topic/get-all?${searchParams.toString()}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    placeholderData: keepPreviousData,
  });

  if (getTopicsResult.isPending) <Loader />;
  return (
    <div className="flex max-w-[1332px] w-full mx-auto px-3 ">
      {/* Left  */}
      <div className="flex-1 ">
        {getTopicsResult?.data?.data?.result?.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {getTopicsResult.data?.data?.result?.map((item: any) => (
                <TopicCard key={item?._id} data={item?.title} />
              ))}
            </div>
            <Paginate
              forcePage={Number(getTopicsResult.data?.data?.page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={getTopicsResult.data?.data?.total_page as number}
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

export default TopicPage;
