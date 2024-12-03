import { memo } from "react";
import { Link } from "react-router-dom";
import ButtonFollow from "../follow/ButtonFollow";

type Type = {
  data: any;
};

const AuthorCard = ({ data }: Type) => {
  return (
    <div className="px-5">
      <Link to={`/author/${data?._id}`} className="flex items-start gap-3">
        <div className="mt-1 w-5 h-5 overflow-hidden rounded-full">
          <img src={data?.avatar} loading="lazy" alt="" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">{data?.name}</div>
          <div className="line-clamp-2 flex-1 text-text-secondary-color text-xs">
            {data?.bio}
          </div>
        </div>
        <ButtonFollow />
      </Link>
    </div>
  );
};

export default memo(AuthorCard);
