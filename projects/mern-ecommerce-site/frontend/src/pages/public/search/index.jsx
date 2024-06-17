import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Paginate from "components/Paginate";
import ProductList from "features/product/ProductList";
import Wrapper from "layouts/Wrapper";
import React, { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SortOptions from "./SortOptions";
import Loading from "components/loading";
import MenuLeft from "./MenuLeft";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    q: "iphone",
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

  const search = useQuery({
    queryKey: [`search`, searchParams.toString()],
    queryFn: async () => {
      const url = `https://tiki.vn/api/v2/products?limit=60&include=advertisement&is_mweb=1&aggregations=2&version=&_v=within_promotions&${searchParams.toString()}`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    },
  });

  useEffect(() => {
    handleSearchParams("page", 1);
  }, [searchParams.get(`q`)]);

  if (search.isLoading) return <Loading />;

  return (
    <Wrapper>
      <div className="flex gap-6">
        <div className="hidden md:block max-w-[230px] w-full">
          <MenuLeft data={search.data?.filters} onchange={handleSearchParams} />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <SortOptions
            data={search?.data?.sort_options}
            onchange={handleSearchParams}
          />
          <div className="flex flex-col gap-3 overflow-hidden">
            <ProductList data={search.data?.data} />
          </div>
          <Paginate
            forcePage={Number(searchParams.get(`page`)) - 1}
            pageCount={Number(search?.data?.paging?.last_page)}
            onPageChange={(e) => {
              console.log({ e });
              handleSearchParams("page", Number(e.selected) + 1);
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Search;
