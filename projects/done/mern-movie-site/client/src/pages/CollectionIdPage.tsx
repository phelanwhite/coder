import CollectionIdBanner from "@/components/common/CollectionIdBanner";
import MediaSide from "@/components/common/MediaSide";
import Loader from "@/components/layout/loader";
import { collection_idApi } from "@/services/tmdb-servies";
import { useAuthStore } from "@/stores/auth-store";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { useFavoriteStore } from "@/stores/favorite-store";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

const CollectionIdPage = () => {
  const { id } = useParams();
  const getDataId = useQuery({
    queryKey: ["collection", id],
    queryFn: async () => await collection_idApi(id as string),
  });

  const { user } = useAuthStore();
  const { checkFavorites } = useFavoriteStore();
  const checkFavoritesResult = useQuery({
    queryKey: [`checkFavorites`, `collection`, id],
    queryFn: async () => {
      return await checkFavorites([
        {
          media_id: id,
          media_type: `collection`,
        },
      ]);
    },
    enabled: !!user,
  });
  const { checkBookmarks } = useBookmarkStore();
  const checkBookmarksResult = useQuery({
    queryKey: [`checkBookmarks`, `collection`, id],
    queryFn: async () => {
      return await checkBookmarks([
        {
          media_id: id,
          media_type: `collection`,
        },
      ]);
    },
    enabled: !!user,
  });

  const dataBanner = useMemo(() => {
    return {
      ...getDataId.data,
      isCheckedFavorite: checkFavoritesResult.data?.data?.[0],
      isCheckedBookmark: checkBookmarksResult.data?.data?.[0],
      media_type: `collection`,
    };
  }, [checkFavoritesResult.data, checkBookmarksResult.data, getDataId.data]);

  if (
    getDataId.isLoading ||
    checkFavoritesResult.isLoading ||
    checkBookmarksResult.isLoading
  )
    return <Loader />;

  return (
    <div>
      <CollectionIdBanner data={dataBanner} />
      <div className="wrapper my-10 space-y-8">
        <MediaSide title="Parts" data={getDataId.data?.parts} />
      </div>
    </div>
  );
};

export default CollectionIdPage;
