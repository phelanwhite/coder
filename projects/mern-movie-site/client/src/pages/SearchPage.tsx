import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { searchApi } from "@/services/tmdb-servies";
import Loader from "@/components/layout/loader";
import { IMAGE_MOVIE } from "@/assets/constants/images-constant";
import MediaCard from "@/components/common/MediaCard";
import { search_options } from "@/assets/constants/commons";
import PersonCard from "@/components/common/PersonCard";
import CompanyCard from "@/components/common/CompanyCard";
import CollectionCard from "@/components/common/CollectionCard";
import { MediaType } from "@/assets/types/media-type";

const SearchPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    query: ``,
    search_type: search_options[0].value,
    page: `1`,
  });

  const [value, setValue] = useState(searchParams.get("query") || "");

  const search = useQuery({
    queryKey: [`search`, searchParams.toString()],
    queryFn: async () => {
      const response = await searchApi({
        paramster: searchParams.toString(),
        type: searchParams.get("search_type") as string,
      });
      return response;
    },
    placeholderData: keepPreviousData,
  });

  if (search.isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      <div
        className="py-16 min-h-[40%]"
        style={{
          background: `url(${IMAGE_MOVIE.banner_about}) no-repeat center/cover`,
        }}
      >
        <div className="wrapper">
          <div className="text-2xl md:text-4xl font-semibold text-white">
            Welcome.
          </div>
          <div className="text-xl md:text-2xl font-semibold text-white mt-2 mb-8">
            Millions of movies, TV shows and people to discover. Explore now.
          </div>
          <div className="flex items-center gap-4 px-4 rounded-full bg-white">
            <FaSearch />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === `Enter`) {
                  handleSearchParams(`query`, value);
                  handleSearchParams(`page`, `1`);
                }
              }}
              placeholder="Search for a movie, tv show, person, ......"
              type="text"
              className="border-none outline-none w-full bg-transparent py-2"
            />
          </div>
        </div>
      </div>
      <div className="wrapper my-10 space-y-8">
        <div className="flex items-center justify-end">
          <select
            className="text-sm cursor-pointer border px-3 py-1 outline-none rounded-lg"
            value={searchParams.get("search_type") as string}
            onChange={(e) => {
              handleSearchParams(`search_type`, e.target.value);
              handleSearchParams(`page`, `1`);
            }}
          >
            {search_options.map((item) => (
              <option key={item.title} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {search.data?.results?.length > 0 ? (
          <>
            <div className="grid gap-x-2 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {search.data?.results?.map((item: any) => {
                if (
                  item?.media_type === "person" ||
                  searchParams.get("search_type") === "person"
                )
                  return <PersonCard data={item} key={item.id} />;
                else if (
                  ["movie", "tv"].find(
                    (value) =>
                      value === item?.media_type ||
                      value === searchParams.get("search_type")
                  )
                )
                  return (
                    <MediaCard
                      key={item?.id}
                      data={item}
                      media_type={searchParams.get("search_type") as MediaType}
                    />
                  );
                else if (
                  item?.media_type === "collection" ||
                  searchParams.get("search_type") === "collection"
                )
                  return <CollectionCard key={item?.id} data={item} />;
                else if (
                  item?.media_type === "company" ||
                  searchParams.get("search_type") === "company"
                )
                  return <CompanyCard key={item?.id} data={item} />;
              })}
            </div>
            <Paginate
              forcePage={Number(search.data?.page) - 1}
              pageCount={search?.data?.total_pages}
              onPageChange={(e) =>
                handleSearchParams(`page`, String(e.selected + 1))
              }
            />
          </>
        ) : (
          <div>
            <div className="text-center text-xl font-semibold text-gray-500">
              No results found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
