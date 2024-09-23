import { images } from "@/assets/constants";
import { memo } from "react";
import { Link } from "react-router-dom";

const AuthorItem = () => {
  return (
    <Link to={`/`} className="flex items-start gap-4">
      <div className="w-8 h-8 overflow-hidden rounded-full">
        <img src={images.account_notfound} loading="lazy" alt="" />
      </div>
      <div className="flex-1">
        <div className="line-clamp-1 text-base font-bold">Rita Kind-Envy</div>
        <div className="line-clamp-2 text-xs leading-4">
          I'm a UX writer who mostly writes about writing. Sometimes I write
          about other things, though.
        </div>
      </div>
      <button className="border rounded-full px-3 py-1.5 text-xs">
        Follow
      </button>
    </Link>
  );
};

export default memo(AuthorItem);
