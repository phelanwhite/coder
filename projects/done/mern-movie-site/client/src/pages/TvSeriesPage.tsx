import { tv_series_options } from "@/assets/constants/commons";
import { IMAGE_MOVIE } from "@/assets/constants/images-constant";
import MediaCard from "@/components/common/MediaCard";
import Loader from "@/components/layout/loader";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { tvSeriesApi } from "@/services/tmdb-servies";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const TvSeriesPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    search_type: tv_series_options[0].value,
    page: `1`,
  });

  const search = useQuery({
    queryKey: [`tv series`, searchParams.toString()],
    queryFn: async () => {
      const response = await tvSeriesApi({
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
            TV Series.
          </div>
          <div className="text-xl md:text-2xl font-semibold text-white mt-2 mb-8">
            Millions of movies, TV shows and people to discover. Explore now.
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
            {tv_series_options.map((item) => (
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
                return <MediaCard key={item?.id} data={item} media_type="tv" />;
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

export default TvSeriesPage;
