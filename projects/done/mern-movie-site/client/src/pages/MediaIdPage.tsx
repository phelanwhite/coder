import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  media_creditsApi,
  media_idApi,
  media_recommendationsApi,
  media_similarApi,
} from "../services/tmdb-servies";
import { useParams } from "react-router-dom";
import MediaSide from "../components/common/MediaSide";
import Loader from "../components/layout/loader";
import { MediaType } from "@/assets/types/media-type";
import MediaIdPageBanner from "@/components/common/MediaIdPageBanner";
import { useFavoriteStore } from "@/stores/favorite-store";
import { useAuthStore } from "@/stores/auth-store";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { useCommentStore } from "@/stores/comment-store";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import CommentList from "@/components/common/CommentList";

const MediaIdPage = () => {
  const { id } = useParams();
  const { searchParams } = useSearchParamsValue();

  const media_id = useQuery({
    queryKey: [`media_id`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await media_idApi(
        id as string,
        searchParams.get("media_type") as string
      );
      return response;
    },
  });
  const media_similar = useQuery({
    queryKey: [`media_similar`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await media_similarApi(
        id as string,
        searchParams.get("media_type") as string
      );
      return response;
    },
  });
  const media_recommendations = useQuery({
    queryKey: [`media_recommendationsApi`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await media_recommendationsApi(
        id as string,
        searchParams.get("media_type") as string
      );
      return response;
    },
  });
  const credits = useQuery({
    queryKey: [`credits `, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await media_creditsApi(
        id as string,
        searchParams.get("media_type") as string
      );
      return response;
    },
  });

  const { getCommentsByMediaId } = useCommentStore();
  const getCommentsByMediaIdResult = useQuery({
    queryKey: ["comments", id, searchParams.get(`media_type`)],
    queryFn: async () => {
      return await getCommentsByMediaId(
        id as string,
        `_media_type=${searchParams.get(`media_type`)}`
      );
    },
  });

  const { user } = useAuthStore();
  const { checkFavorites } = useFavoriteStore();
  const checkFavoritesResult = useQuery({
    queryKey: [`checkFavorites`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      return await checkFavorites([
        {
          media_id: id,
          media_type: searchParams.get(`media_type`),
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
          media_type: searchParams.get(`media_type`),
        },
      ]);
    },
    enabled: !!user,
  });

  const mediaData = useMemo(() => media_id.data, [media_id]);

  const dataBanner = useMemo(() => {
    return {
      ...media_id.data,
      isCheckedFavorite: checkFavoritesResult.data?.data?.[0],
      isCheckedBookmark: checkBookmarksResult.data?.data?.[0],
      media_type: searchParams.get("media_type"),
    };
  }, [checkFavoritesResult.data, checkBookmarksResult.data, media_id.data]);

  if (
    checkFavoritesResult.isLoading ||
    checkBookmarksResult.isLoading ||
    getCommentsByMediaIdResult.isLoading ||
    media_id.isLoading ||
    media_similar.isLoading ||
    media_recommendations.isLoading ||
    credits.isLoading
  )
    return <Loader />;

  return (
    <>
      <MediaIdPageBanner mediaData={dataBanner} />
      <div className="wrapper my-10 space-y-8">
        <MediaSide
          title="Cast"
          data={credits?.data?.cast}
          media_type={`character`}
        />
        <MediaSide
          title="seasons"
          data={mediaData?.seasons}
          media_type={searchParams.get("media_type") as MediaType}
        />
        <MediaSide
          title="similar"
          data={media_similar.data?.results}
          media_type={searchParams.get("media_type") as MediaType}
        />
        <MediaSide
          title="recommendations"
          data={media_recommendations.data?.results}
          media_type={searchParams.get("media_type") as MediaType}
        />
        <CommentList
          media_id={id as string}
          media_type={searchParams.get("media_type") as MediaType}
        />
      </div>
    </>
  );
};

export default MediaIdPage;
