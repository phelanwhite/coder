import React, { memo, useCallback } from "react";
import banner from "assets/images/banner-about.png";
import { getTmdbUrl } from "services/tmdbApi";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Wrapper from "components/ui/wrapper";
import Loader from "components/ui/loader";
import MediaList from "features/media/components/MediaList";
import Paginate from "components/ui/paginate";

const Movie = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    media_type: "movie",
    q: "",
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

  const movie = useQuery({
    queryKey: [`movie`, searchParams.get(`page`)],
    queryFn: async () => {
      const response = await getTmdbUrl(
        `movie/now_playing?page=${searchParams.get(`page`)}`
      );

      return response;
    },
  });

  if (movie.isLoading) return <Loader />;

  return (
    <div>
      <div
        className="min-h-[30vh] md:min-h-[50vh] flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${banner}) no-repeat center/cover`,
        }}
      >
        <Wrapper>
          <div className="text-2xl text-white text-center font-semibold">
            Movie
          </div>
        </Wrapper>
      </div>
      <Wrapper>
        <div className="my-8">
          <MediaList
            media_type={searchParams.get(`media_type`)}
            media_list={movie.data?.results}
          />
          {movie?.data?.total_pages > 1 && (
            <Paginate
              currentPage={Number(movie.data?.page) - 1}
              pageCount={movie?.data?.total_pages}
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

export default memo(Movie);
