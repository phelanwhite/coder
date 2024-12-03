import MyQueriesResultList from "@/components/common/MyQueriesResultList";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useFavoriteStore } from "@/stores/favorite-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const Favorite = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { favorites, getFavoriteByMe } = useFavoriteStore();
  const getDatasResult = useQuery({
    queryKey: [`post`, `me`, searchParams.toString()],
    queryFn: async () => {
      return await getFavoriteByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  return (
    <MyQueriesResultList
      menuType="Favorite"
      loading={getDatasResult.isLoading}
      datas={favorites}
      onchagePage={(e) => handleSearchParams(`_page`, e.selected + 1)}
      page={getDatasResult?.data?.data?._page}
      pageCount={getDatasResult?.data?.data?.total_pages}
    />
  );
};

export default Favorite;
