import { sort_options } from "@/assets/constants/common";
import ProductCard from "@/components/common/product/ProductCard";
import Loader from "@/components/form/loader";
import Paginate from "@/components/form/paginate";
import SelectField from "@/components/form/SelectField";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const CategoryIdPage = () => {
  const { id } = useParams();
  const { searchParams, handleSearchParams } = useSearchParamsValue();

  const getSearchResult = useQuery({
    queryKey: ["product", "category", id, searchParams.toString()],
    queryFn: async () => {
      const url = `product/get-all-by-category-id/${id}?${searchParams.toString()}`;
      return (await axiosConfig.get(url)).data;
    },
    placeholderData: keepPreviousData,
    enabled: !!id,
  });

  if (getSearchResult.isLoading) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          <SelectField options={sort_options} className="w-max text-xs" />
        </div>
      </div>
      {getSearchResult.data?.data?.results?.length === 0 && (
        <div className="text-center">No results.</div>
      )}
      {getSearchResult.data?.data?.results?.length > 0 && (
        <>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {getSearchResult.data?.data?.results?.map((item: any) => (
              <ProductCard key={item?._id} data={item} />
            ))}
          </div>
          <Paginate
            forcePage={Number(getSearchResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getSearchResult.data?.data?.total_page as number}
          />
        </>
      )}
    </div>
  );
};

export default CategoryIdPage;
