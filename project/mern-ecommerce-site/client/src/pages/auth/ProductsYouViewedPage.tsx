import ProductCard from "@/components/common/product/ProductCard";
import Loader from "@/components/form/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useViewedStore } from "@/stores/viewed-store";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ProductsYouViewedPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();

  const { getViewed, vieweds, deleteVieweds } = useViewedStore();
  const getViewedResult = useQuery({
    queryKey: ["viewed", searchParams.toString()],
    queryFn: async () => {
      return getViewed(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  const deleteViewedsResult = useMutation({
    mutationFn: async () => {
      return deleteVieweds();
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (getViewedResult.isLoading || deleteViewedsResult.isPending)
    return <Loader />;

  return (
    <div className="space-y-4">
      {vieweds.length > 0 ? (
        <>
          <div>
            <div className="text-secondary-2 mb-2">
              You can clear your reading history for a fresh start.
            </div>
            <button
              onClick={() => deleteViewedsResult.mutate()}
              className="btn btn-danger rounded-full btn-sm"
            >
              Clear History
            </button>
          </div>
          <div className="grid gap-2 grid-cols-6">
            {vieweds.map((item: any) => {
              return <ProductCard key={item._id} data={item?.product} />;
            })}
          </div>
          <Paginate
            forcePage={Number(getViewedResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getViewedResult.data?.data?.total_page as number}
          />
        </>
      ) : (
        <div className="text-center text-gray-500">No results</div>
      )}
    </div>
  );
};

export default ProductsYouViewedPage;
