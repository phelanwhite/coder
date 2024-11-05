import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import { getTmdbImage } from "@/services/tmdb-servies";
import { memo } from "react";
import { Link } from "react-router-dom";

const PersonCard = ({ data }: { data: any }) => {
  return (
    <Link to={`/person/${data?.id}`} className="">
      <div className="rounded-lg overflow-hidden aspect-thumbnail">
        <img
          src={
            data?.profile_path
              ? getTmdbImage(data?.profile_path)
              : IMAGES_DEFAULT.account_notfound
          }
          alt=""
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <div className="font-semibold line-clamp-1">{data?.name}</div>
        <div className="text-xs">{data?.original_name}</div>
        <div className="text-xs">{data?.known_for_department}</div>
      </div>
    </Link>
  );
};

export default memo(PersonCard);
