import { BlogList1 } from "@/components/common/blog/BlogList";
import Paginate from "@/components/layout/paginate";
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
      await axiosConfig.get(`/topic/get-id/${id}/incriment-view`);
      const url = `blog/get-blogs-by-topic?${searchParams.toString()}`;
      const response = (
        await axiosConfig.get(url, {
          params: {
            _topic: id,
          },
        })
      ).data;
      return response;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex-1 ">
      <div className="px-4 text-2xl font-medium text-text-secondary-color-2 mb-8">
        Results for <span className="text-black">{id}</span>
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

export default TopicIdPage;
