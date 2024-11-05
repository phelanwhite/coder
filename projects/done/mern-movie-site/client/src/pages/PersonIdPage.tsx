import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import MediaSide from "@/components/common/MediaSide";
import { MediaType } from "@/assets/types/media-type";
import Loader from "@/components/layout/loader";
import { person_idApi, person_idMediaApi } from "@/services/tmdb-servies";
import PersonIdPageBanner from "@/components/common/PersonIdPageBanner";
import { person_media_options } from "@/assets/constants/commons";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { useFavoriteStore } from "@/stores/favorite-store";
import { useAuthStore } from "@/stores/auth-store";
import { useMemo } from "react";

const PersonIdPage = () => {
  const { id } = useParams();
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    media_type: "movie",
  });

  const person_id = useQuery({
    queryKey: [`person_id`, id],
    queryFn: async () => {
      const response = await person_idApi(id as string);
      return response;
    },
    placeholderData: keepPreviousData,
  });

  const person_media = useQuery({
    queryKey: [`person_media`, searchParams.toString(), id],
    queryFn: async () => {
      const response = await person_idMediaApi(
        id as string,
        searchParams.get("media_type") === "movie"
          ? "movie_credits"
          : "tv_credits"
      );
      return response;
    },
    placeholderData: keepPreviousData,
  });
  const { user } = useAuthStore();
  const { checkFavorites } = useFavoriteStore();
  const checkFavoritesResult = useQuery({
    queryKey: [`checkFavorites`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      return await checkFavorites([
        {
          media_id: id,
          media_type: "person",
        },
      ]);
    },
    enabled: !!user,
  });
  const { checkBookmarks } = useBookmarkStore();
  const checkBookmarksResult = useQuery({
    queryKey: [`checkBookmarks`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      return await checkBookmarks([
        {
          media_id: id,
          media_type: "person",
        },
      ]);
    },
    enabled: !!user,
  });

  const dataBanner = useMemo(() => {
    return {
      ...person_id.data,
      isCheckedFavorite: checkFavoritesResult.data?.data?.[0],
      isCheckedBookmark: checkBookmarksResult.data?.data?.[0],
      media_type: "person",
    };
  }, [checkFavoritesResult.data, checkBookmarksResult.data, person_id.data]);

  if (
    checkFavoritesResult.isLoading ||
    checkBookmarksResult.isLoading ||
    person_id.isLoading ||
    person_media.isLoading
  )
    return <Loader />;

  return (
    <div>
      <PersonIdPageBanner data={dataBanner} />
      <div className="wrapper my-10 space-y-8">
        <div className="flex items-center justify-end">
          <select
            className="text-sm cursor-pointer border px-3 py-1 outline-none rounded-lg"
            value={searchParams.get("media_type") as string}
            onChange={(e) => handleSearchParams(`media_type`, e.target.value)}
            name=""
            id=""
          >
            {person_media_options.map((item) => (
              <option key={item.title} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <MediaSide
          title="Cast"
          data={person_media.data?.cast}
          media_type={searchParams.get("media_type") as MediaType}
        />
        <MediaSide
          title="Crew"
          data={person_media.data?.crew}
          media_type={searchParams.get("media_type") as MediaType}
        />
      </div>
    </div>
  );
};

export default PersonIdPage;
