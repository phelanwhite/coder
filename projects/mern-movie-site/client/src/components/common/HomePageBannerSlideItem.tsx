import { usePlayTrailerContext } from "@/contexts/PlayTrailerContext";
import { getTmdbImage } from "@/services/tmdb-servies";
import { memo } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePageBannerSlideItem = ({ data }: { data: any }) => {
  const { handleOpenTrailer } = usePlayTrailerContext();
  return (
    <div
      className="h-screen py-16 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
url(${getTmdbImage(data?.backdrop_path)}) no-repeat center/cover`,
      }}
    >
      <div className="wrapper h-full flex items-center">
        <div className="flex items-start gap-8">
          <div className="hidden sm:block rounded-lg overflow-hidden w-full max-w-[300px] lg:max-w-[400px]">
            <img src={getTmdbImage(data?.poster_path)} alt="" loading="lazy" />
          </div>
          <div className="flex-1 text-white space-y-6">
            <div>
              <Link
                to={`/media/${data?.id}?media_type=${data?.media_type}`}
                className="font-bold text-3xl"
              >
                {data?.title || data?.name}
              </Link>
              <div className="mt-1 line-clamp-1 text-sm flex gap-4 text-gray-300 italic">
                <span>Date: {data?.release_date || data?.first_air_date}</span>
                <span>Popularity: {data?.popularity}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[rgb(8,28,34)] w-14 h-14 overflow-hidden rounded-full">
                <CircularProgressbar
                  value={data?.vote_average * 10}
                  text={`${Math.round(Number(data?.vote_average) * 10)}%`}
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
              <button
                onClick={() => handleOpenTrailer(data?.id, data?.media_type)}
                className="flex items-center gap-1 hover:text-gray-500"
              >
                <FaPlay />
                <span className="font-semibold text-base">Play Trailer</span>
              </button>
            </div>
            <div className="">
              <div className="font-semibold text-xl capitalize mb-1">
                overview
              </div>
              <div className="italic text-gray-300">{data?.overview}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePageBannerSlideItem);
