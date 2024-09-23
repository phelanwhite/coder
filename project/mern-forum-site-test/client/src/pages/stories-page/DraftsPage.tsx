import BlogItem from "@/components/common/BlogItem";
import Paginate from "@/components/form/paginate";
import Loader from "@/components/layout/loader";
import useSearchParamsValue from "@/hook/useSearchParamsValue";
import { useBlogStore } from "@/store/blog-store";
import { useQuery } from "@tanstack/react-query";

const DraftsPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    status: `-1`,
  });
  const { blogs, getBlogsByMe } = useBlogStore();
  const getBlogsResult = useQuery({
    queryKey: ["blogs", blogs, searchParams.toString()],
    queryFn: () => getBlogsByMe(searchParams.toString()),
  });

  if (getBlogsResult.isLoading) return <Loader />;

  if (blogs.length > 0) {
    return (
      <div className="space-y-5">
        {blogs.map((item) => (
          <BlogItem key={item._id} data={item} isDraft={true} />
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
        <div className="font-semibold">You have no drafts.</div>
      </div>
    );
  }
};

export default DraftsPage;
