import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { getTmdbImage } from "../services/tmdb";
import { FaBookmark, FaList, FaPlay } from "react-icons/fa";
import { memo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ButtonFavorite from "./ButtonFavorite";
import {
  ModalMediaPlayTrailer,
  usePlayTrailerContext,
} from "../context/PlayTrailerContext";
import ButtonList from "./ButtonList";
import { ModalListBox, useListBoxContext } from "../context/ListBoxContext";

const MediaIdBanner = ({ mediaData }: { mediaData: any }) => {
  const { id } = useParams();

  const user = useSelector((state: any) => state?.authSlice?.currentUser);
  const [searchParams] = useSearchParams();

  const { isOpenTrailer, handleCloseTrailer, mediaTrailer, handleOpenTrailer } =
    usePlayTrailerContext();

  const { itemAddMyList, isOpenMyListBox, handleCloseListBox } =
    useListBoxContext();

  return (
    <>
      <div
        className="min-h-[50vh] py-8 md:py-16 overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
    url(${getTmdbImage(mediaData?.backdrop_path)}) no-repeat center/cover`,
        }}
      >
        <div className="wrapper h-full flex flex-col md:flex-row md:items-start gap-8">
          <div className="rounded-lg overflow-hidden w-full md:max-w-[300px] aspect-thumbnail">
            <img
              src={getTmdbImage(mediaData?.poster_path)}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="flex-1 text-white space-y-6">
            <div>
              <div className="font-bold text-3xl">
                {mediaData?.title || mediaData?.name}
              </div>
              <div className="mt-1 line-clamp-1 text-sm flex gap-4 text-gray-300 italic">
                <span>
                  Date: {mediaData?.release_date || mediaData?.first_air_date}
                </span>
                <span>Popularity: {mediaData?.popularity}</span>
              </div>
              <div className="mt-1 line-clamp-1 text-sm text-gray-300 italic">
                <span>Genre: </span>
                {mediaData?.genres?.map((genre: any) => (
                  <span className="ml-2" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="mt-1 line-clamp-1 text-sm text-gray-300 italic">
                <span>Countries: </span>
                {mediaData?.production_countries?.map((c: any) => (
                  <span className="ml-2" key={c.iso_3166_1}>
                    {c.name}
                  </span>
                ))}
              </div>
              <div className="mt-1 line-clamp-1 text-sm text-gray-300 italic">
                <span>Runtime: </span>
                {mediaData?.runtime}m
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[rgb(8,28,34)] w-14 h-14 overflow-hidden rounded-full">
                <CircularProgressbar
                  value={mediaData?.vote_average * 10}
                  text={`${Math.round(Number(mediaData?.vote_average) * 10)}%`}
                  styles={buildStyles({
                    textColor: `white`,
                    textSize: `24px`,
                    pathColor: `rgb(22, 163, 74, 1)`,
                    trailColor: `rgba(229, 231, 235, 1)`,
                    backgroundColor: `#081C22`,
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
              <div className="w-min font-semibold">User Score</div>
              <button className="bg-[rgb(3,37,65)] ml-2 text-sm px-4 py-2 rounded-full font-semibold hover:scale-105 transition">
                What's your Vibe ?
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <ButtonList
                id={id as string}
                media_type={searchParams.get("media_type") as string}
              />
              <ButtonFavorite
                favouriteId={mediaData?.id}
                favouriteType={searchParams.get("media_type") as string}
              />
              <button
                title="Add to your watchlist"
                className="bg-[rgb(3,37,65)] text-white rounded-full w-12 h-12 overflow-hidden flex items-center justify-center"
              >
                <FaBookmark />
              </button>
              <button
                onClick={() =>
                  handleOpenTrailer(id, searchParams.get("media_type"))
                }
                className="flex items-center gap-1 hover:text-gray-500"
              >
                <FaPlay />
                <span className="font-semibold text-base">Play Trailer</span>
              </button>
            </div>
            <div className="">
              <div className="italic text-gray-300">{mediaData?.tagline}</div>
              <div className="font-semibold text-xl capitalize my-1">
                overview
              </div>
              <div className="italic text-gray-300">{mediaData?.overview}</div>
            </div>
          </div>
        </div>
      </div>
      <ModalMediaPlayTrailer
        isOpenTrailer={isOpenTrailer}
        handleClose={handleCloseTrailer}
        mediaTrailer={mediaTrailer}
      />
      <ModalListBox
        isOpenMyListBox={isOpenMyListBox}
        handleClose={handleCloseListBox}
        itemAddMyList={itemAddMyList}
      />
    </>
  );
};

export default memo(MediaIdBanner);