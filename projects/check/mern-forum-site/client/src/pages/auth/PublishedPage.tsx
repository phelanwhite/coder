import BlogItem from "@/components/common/blog/BlogItem";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useBlogStore } from "@/stores/blog-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const PublishedPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    _status: `1`,
  });
  const { blogs, getBlogsByMe } = useBlogStore();
  const getBlogsByMeResult = useQuery({
    queryKey: ["blogsByMe", blogs.length, searchParams.toString()],
    queryFn: async () => {
      return await getBlogsByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  if (getBlogsByMeResult.isPending) return <Loader />;
  if (blogs.length > 0) {
    return (
      <div className="space-y-4">
        {blogs.map((item) => {
          return <BlogItem key={item._id} data={item} />;
        })}
        <Paginate
          forcePage={Number(getBlogsByMeResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
          pageCount={getBlogsByMeResult.data?.data?.total_page as number}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">You have no published.</div>
      </div>
    );
  }
};

export default PublishedPage;
