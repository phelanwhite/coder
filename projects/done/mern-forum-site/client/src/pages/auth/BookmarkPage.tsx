import { BlogList1 } from "@/components/common/blog/BlogList";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const BookmarkPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { bookmarks, getBookmarksByMe } = useBookmarkStore();

  const getBookmarksByMeResult = useQuery({
    queryKey: ["me", "bookmarks", searchParams.toString()],
    queryFn: async () => {
      return getBookmarksByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <BlogList1
        isLoading={getBookmarksByMeResult.isLoading}
        datas={bookmarks}
        type="bookmark"
      />
      {getBookmarksByMeResult.data && bookmarks?.length > 0 && (
        <div className="mt-4">
          <Paginate
            forcePage={Number(getBookmarksByMeResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getBookmarksByMeResult.data?.data?.total_page as number}
          />
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
