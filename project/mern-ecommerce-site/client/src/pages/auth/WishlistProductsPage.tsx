import ProductCard from "@/components/common/product/ProductCard";
import Loader from "@/components/form/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useWishlistStore } from "@/stores/wishlist-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const WishlistProductsPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();

  const { wishlists, getWishlists } = useWishlistStore();
  const getWishlistsResult = useQuery({
    queryKey: ["wishlist", searchParams.toString()],
    queryFn: async () => {
      return getWishlists(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  if (getWishlistsResult.isLoading) return <Loader />;

  return (
    <div className="space-y-4">
      {wishlists.length > 0 ? (
        <>
          <div className="grid gap-2 grid-cols-6">
            {wishlists.map((item: any) => {
              return <ProductCard key={item._id} data={item?.product} />;
            })}
          </div>
          <Paginate
            forcePage={Number(getWishlistsResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getWishlistsResult.data?.data?.total_page as number}
          />
        </>
      ) : (
        <div className="text-center text-gray-500">No results</div>
      )}
    </div>
  );
};

export default WishlistProductsPage;
