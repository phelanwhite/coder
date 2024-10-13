import FavoriteItem from "@/components/common/favorite/FavoriteItem";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useFavoriteStore } from "@/stores/favorite-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const FavoritePage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { favorites, getFavoritesByMe } = useFavoriteStore();
  const getFavoritesByMeResult = useQuery({
    queryKey: ["favorite", "me", favorites.length, searchParams.toString()],
    queryFn: async () => {
      return await getFavoritesByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  if (getFavoritesByMeResult.isPending) return <Loader />;

  if (favorites.length > 0) {
    return (
      <div className="space-y-4">
        {favorites.map((item) => {
          return <FavoriteItem key={item._id} data={item} />;
        })}
        <Paginate
          forcePage={Number(getFavoritesByMeResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
          pageCount={getFavoritesByMeResult.data?.data?.total_page as number}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">You have no favorite.</div>
      </div>
    );
  }
};

export default FavoritePage;
