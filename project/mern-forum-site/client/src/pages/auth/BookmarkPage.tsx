import BlogCard1 from "@/components/common/blog/BlogCard1";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const BookmarkPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { bookmarks, getBookmarksByMe } = useBookmarkStore();
  const getBlogsByMeResult = useQuery({
    queryKey: ["bookmarks", "me", bookmarks.length, searchParams.toString()],
    queryFn: async () => {
      return await getBookmarksByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  if (getBlogsByMeResult.isPending) return <Loader />;

  if (bookmarks.length > 0) {
    return (
      <div className="space-y-4">
        {bookmarks.map((item) => {
          return <BlogCard1 key={item._id} data={item?.blog} />;
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

export default BookmarkPage;
