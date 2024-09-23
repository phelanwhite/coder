import { BlogCard1 } from "@/components/common/BlogCard";
import Paginate from "@/components/form/paginate";
import Loader from "@/components/layout/loader";
import axiosConfig from "@/config/axios-config";
import useSearchParamsValue from "@/hook/useSearchParamsValue";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const TagsPage = () => {
  const { slug } = useParams();
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    topic: slug as string,
  });
  const getBlogsResult = useQuery({
    queryKey: ["blogs", searchParams.toString()],
    queryFn: async () => {
      const url = `blog/get-all?${searchParams.toString()}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });

  if (getBlogsResult.isLoading) return <Loader />;

  if (getBlogsResult.data?.data?.data?.length > 0) {
    return (
      <div className="space-y-5">
        {getBlogsResult.data?.data?.data?.map((item: any) => (
          <BlogCard1 key={item._id} data={item} />
        ))}
        <Paginate
          forcePage={Number(getBlogsResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`page`, e.selected + 1)}
          pageCount={getBlogsResult.data?.data?.total_page as number}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">No published.</div>
      </div>
    );
  }
};

export default TagsPage;
