import ProductCard from "@/components/common/product/ProductCard";
import Loader from "@/components/form/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const BookmarkProductsPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();

  const { bookmarks, getBookmarks } = useBookmarkStore();
  const getBookmarksResult = useQuery({
    queryKey: ["bookmark", searchParams.toString()],
    queryFn: async () => {
      return getBookmarks(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  if (getBookmarksResult.isLoading) return <Loader />;

  return (
    <div className="space-y-4">
      {bookmarks.length > 0 ? (
        <>
          <div className="grid gap-2 grid-cols-6">
            {bookmarks.map((item: any) => {
              return <ProductCard key={item._id} data={item?.product} />;
            })}
          </div>
          <Paginate
            forcePage={Number(getBookmarksResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getBookmarksResult.data?.data?.total_page as number}
          />
        </>
      ) : (
        <div className="text-center text-gray-500">No results</div>
      )}
    </div>
  );
};

export default BookmarkProductsPage;
