import MyQueriesResultList from "@/components/common/MyQueriesResultList";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const Bookmark = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { bookmarks, getBookmarkByMe } = useBookmarkStore();
  const getDatasResult = useQuery({
    queryKey: [`me`, `bookmark`, searchParams.toString()],
    queryFn: async () => {
      return await getBookmarkByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  return (
    <MyQueriesResultList
      menuType="Bookmark"
      loading={getDatasResult.isLoading}
      datas={bookmarks}
      onchagePage={(e) => handleSearchParams(`_page`, e.selected + 1)}
      page={getDatasResult?.data?.data?._page}
      pageCount={getDatasResult?.data?.data?.total_pages}
    />
  );
};

export default Bookmark;
