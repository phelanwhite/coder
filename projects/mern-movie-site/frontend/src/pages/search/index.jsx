import React, { memo, useCallback } from "react";
import banner from "assets/images/banner-about.png";
import { FaSearch } from "react-icons/fa";
import { getTmdbUrl } from "services/tmdbApi";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import Wrapper from "components/ui/wrapper";
import Loader from "components/ui/loader";
import { search_type } from "data/containts";
import MediaCard from "features/media/components/MediaCard";
import PersonCard from "features/person/components/PersonCard";
import Paginate from "components/ui/paginate";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    media_type: search_type[0].value,
    q: "",
    page: 1,
  });
  const [debounce] = useDebounce(searchParams.get(`q`), 1000);

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
    queryKey: [
      `search`,
      debounce,
      searchParams.get(`page`),
      searchParams.get(`media_type`),
    ],
    queryFn: async () => {
      const response = debounce
        ? await getTmdbUrl(
            `search/${searchParams.get(
              "media_type"
            )}?query=${debounce}&page=${searchParams.get(`page`)}`
          )
        : { results: [] };
      return response;
    },
  });

  if (search.isLoading) return <Loader />;

  return (
    <div>
      <div
        className="min-h-[50vh] flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${banner}) no-repeat center/cover`,
        }}
      >
        <Wrapper>
          <div className="max-w-[1000px] mx-auto">
            <form action="" method="post">
              <div className="flex md:items-center gap-4 flex-col md:flex-row">
                <div className="flex-1 input-box text-white">
                  <input
                    value={searchParams.get(`q`) || ""}
                    onChange={(e) => handleSearchParams(`q`, e.target.value)}
                    placeholder="Search..."
                    type="text"
                    className="bg-transparent border-none outline-none flex-1"
                  />
                  <FaSearch />
                </div>
                <select
                  value={searchParams.get(`media_type`) || ""}
                  onChange={(e) => {
                    handleSearchParams(`media_type`, e.target.value);
                    handleSearchParams(`page`, 1);
                  }}
                  name=""
                  id=""
                  className="input-box md:max-w-max bg-white text-black"
                >
                  {search_type.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </Wrapper>
      </div>

      <Wrapper>
        <div className="my-8">
          {search.data?.results?.length === 0 && <div>Not found result</div>}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7">
            {search.data?.results?.map((item) => {
              if (
                item?.media_type === "person" ||
                searchParams.get("media_type") === "person"
              )
                return <PersonCard key={item?.id} actor={item} />;
              if (
                item?.media_type === "movie" ||
                searchParams.get("media_type") === "movie" ||
                item?.media_type === "tv" ||
                searchParams.get("media_type") === "tv"
              )
                return (
                  <MediaCard
                    key={item?.id}
                    media={item}
                    media_type={searchParams.get("media_type")}
                  />
                );
            })}
          </div>

          {search?.data?.total_pages > 1 && (
            <Paginate
              currentPage={Number(search.data?.page) - 1}
              pageCount={search?.data?.total_pages}
              onPageChange={(e) =>
                handleSearchParams(`page`, Number(e.selected) + 1)
              }
            />
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default memo(Search);
