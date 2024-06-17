import React, { memo } from "react";
import { Link } from "react-router-dom";
import { getTmdbImage } from "services/tmdbApi";

const CharacterCard = ({ actor }) => {
  return (
    <Link
      to={`/actor-id/${actor?.id}`}
      className="relative group aspect-thumbnail block rounded-lg overflow-hidden "
    >
      <img src={getTmdbImage(actor?.profile_path)} alt="" loading="lazy" />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/50 text-white p-2 flex flex-col justify-end gap-2 duration-300 translate-y-[110%] group-hover:translate-y-0">
        <div className="font-semibold line-clamp-1">{actor?.character}</div>
        <div className="text-xs">{actor?.name || actor?.original_name}</div>
      </div>
    </Link>
  );
};

export default memo(CharacterCard);
