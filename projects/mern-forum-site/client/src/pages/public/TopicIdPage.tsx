import BlogCard1 from "@/components/common/blog/BlogCard1";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import SidebarRight from "@/components/layout/SidebarRight";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const TopicIdPage = () => {
  const { id } = useParams();

  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const getBlogsResult = useQuery({
    queryKey: ["blogs", "topic", id, searchParams.toString()],
    queryFn: async () => {
      const url = `blog/get-blogs-by-topic-id/${id}?${searchParams.toString()}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
  const incrimentTopicResult = useQuery({
    queryKey: ["topic", "incriment", id],
    queryFn: async () => {
      const url = `topic/incriment?_title=${id}`;
      return await axiosConfig.put(url);
    },
  });

  if (getBlogsResult.isPending || incrimentTopicResult.isLoading) <Loader />;

  return (
    <div className="flex max-w-[1332px] w-full mx-auto px-3 ">
      {/* Left  */}
      <div className="flex-1 ">
        <div className="text-2xl font-medium text-text-secondary-color-2 mb-8">
          Results for <span className="text-black">{id}</span>
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

export default TopicIdPage;
