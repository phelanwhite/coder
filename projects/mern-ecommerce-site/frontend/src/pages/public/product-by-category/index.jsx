import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Wrapper from "layouts/Wrapper";
import React, { useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductList from "features/product/ProductList";
import MenuLeft from "./MenuLeft";
import Loading from "components/loading";
import Paginate from "components/Paginate";
import SortOptions from "./SortOptions";

const ProductByCategory = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
  });
  const handleSearchParams = useCallback(
    (name, value) => {
      setSearchParams(
        (prev) => {
          prev.set(name, value);
          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const productByCategory = useQuery({
    queryKey: [`product-by-category`, id, searchParams.toString()],
    queryFn: async () => {
      const url = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&category=${id}&${searchParams.toString()}`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });
  // console.log({ productByCategory });
  if (productByCategory.isLoading) return <Loading />;
  return (
    <div>
      <Wrapper>
        <div className="flex gap-6">
          <div className="hidden md:block max-w-[230px] w-full">
            <MenuLeft
              data={productByCategory.data?.filters}
              onchange={handleSearchParams}
            />
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <SortOptions
              dataSort={productByCategory?.data?.sort_options}
              dataFilter={productByCategory?.data?.filters}
              onchange={handleSearchParams}
            />
            <div className="flex flex-col gap-3 overflow-hidden">
              <ProductList data={productByCategory.data?.data} />
            </div>
            <Paginate
              forcePage={Number(searchParams.get(`page`)) - 1}
              pageCount={Number(productByCategory?.data?.paging?.last_page)}
              onPageChange={(e) => {
                console.log({ e });
                handleSearchParams("page", Number(e.selected) + 1);
              }}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductByCategory;
