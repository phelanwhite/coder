import { BlogCard1 } from "@/components/common/blog/BlogCard";
import { BlogList1 } from "@/components/common/blog/BlogList";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useBlogStore } from "@/stores/blog-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const PublishedPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    _status: `1`,
  });
  const { blogs, getBlogsByMe } = useBlogStore();
  const getBlogsByMeResult = useQuery({
    queryKey: ["me", "blogs", searchParams.toString()],
    queryFn: async () => {
      return await getBlogsByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  return (
    <div>
      <BlogList1
        isLoading={getBlogsByMeResult.isLoading}
        datas={blogs}
        type="author"
      />
      {getBlogsByMeResult.data && blogs?.length > 0 && (
        <div className="mt-4">
          <Paginate
            forcePage={Number(getBlogsByMeResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getBlogsByMeResult.data?.data?.total_page as number}
          />
        </div>
      )}
    </div>
  );
};

export default PublishedPage;
