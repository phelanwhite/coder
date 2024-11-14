import { BlogCard1 } from "@/components/common/blog/BlogCard";
import { BlogList1 } from "@/components/common/blog/BlogList";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useFavoriteStore } from "@/stores/favorite-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const FavoritePage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { favorites, getFavoritesByMe } = useFavoriteStore();

  const getFavoritesByMeResult = useQuery({
    queryKey: ["me", "favorites", searchParams.toString()],
    queryFn: async () => {
      return getFavoritesByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <BlogList1
        isLoading={getFavoritesByMeResult.isLoading}
        datas={favorites}
        type="favorite"
      />
      {getFavoritesByMeResult.data && favorites?.length > 0 && (
        <div className="mt-4">
          <Paginate
            forcePage={Number(getFavoritesByMeResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getFavoritesByMeResult.data?.data?.total_page as number}
          />
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
