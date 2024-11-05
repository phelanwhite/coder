import { getTmdbImage } from "@/services/tmdb-servies";
import { memo } from "react";
import ButtonFavorite from "./ButtonFavorite";
import ButtonBookmark from "./ButtonBookmark";

const CollectionIdBanner = ({ data }: { data: any }) => {
  return (
    <>
      <div
        className="min-h-screen text-white flex items-center justify-center py-16"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${getTmdbImage(
                  data?.backdrop_path
                )}) no-repeat center/cover`,
        }}
      >
        <div className="wrapper h-full flex flex-col md:flex-row md:items-start gap-8">
          <div className="rounded-lg overflow-hidden w-full md:max-w-[300px] aspect-thumbnail">
            <img src={getTmdbImage(data?.poster_path)} alt="" loading="lazy" />
          </div>
          <div className="flex-1 text-white space-y-6">
            <div className="text-3xl font-bold">
              {data?.name || data?.title}
            </div>
            <div className="flex items-center gap-4 text-xs">
              <ButtonFavorite
                media_id={data?.id}
                media_type={data?.media_type}
                isChecked={data?.isCheckedFavorite}
              />
              <ButtonBookmark
                media_id={data?.id}
                media_type={data?.media_type}
                isChecked={data?.isCheckedBookmark}
              />
            </div>
            <div>
              <span>Overview: </span>
              <span>{data?.overview}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CollectionIdBanner);
