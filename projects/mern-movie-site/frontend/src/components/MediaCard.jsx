import { memo } from "react";
import { Link } from "react-router-dom";
import { getTmdbImage } from "services/tmdbApi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MediaCard = ({ media, media_type }) => {
  return (
    <Link
      to={`/media-id/${media.id}?media_type=${
        media?.media_type ? media?.media_type : media_type
      }`}
      className="relative group aspect-thumbnail block rounded-lg overflow-hidden "
    >
      <img src={getTmdbImage(media?.poster_path)} alt="" />

      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/50 text-white p-2 flex flex-col justify-end gap-2 duration-300 translate-y-[110%] group-hover:translate-y-0">
        <div className="w-[40px] h-[40px] overflow-hidden">
          <CircularProgressbar
            value={media?.vote_average * 10}
            text={`${Math.round(Number(media.vote_average) * 10)}%`}
            styles={buildStyles({
              textColor: `white`,
              textSize: `20px`,

              pathColor: `rgb(22, 163, 74, 1)`,
              trailColor: `rgba(255, 255, 255, 1)`,
              pathTransitionDuration: 0.5,
              pathTransitionTimingFunction: `ease-in-out`,
            })}
          />
        </div>
        <div className="font-semibold line-clamp-1">
          {media?.title || media?.name}
        </div>
        <div>
          {(media?.release_date || media?.first_air_date) &&
            new Date(
              media?.release_date || media?.first_air_date
            ).getFullYear()}
        </div>
      </div>
    </Link>
  );
};

export default memo(MediaCard);
