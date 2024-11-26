import { memo } from "react";
import { Link } from "react-router-dom";
import ButtonFollow from "../follow/ButtonFollow";

const AuthorCard = () => {
  return (
    <div>
      <Link to={`/author/:id`} className="flex items-start gap-3">
        <div className="w-5 h-5 overflow-hidden rounded-full">
          <img
            src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*-tzW3bME_SnB0YinD_EDOA.jpeg"
            loading="lazy"
            alt=""
          />
        </div>
        <div className="flex-1">
          <div className="font-medium text-xs">Upeksha Herath</div>
          <div className="line-clamp-2 flex-1 text-text-secondary-color text-xs">
            Software Engineer | Technical Writer | Exploring tech frontiers,
            simplifying complexities. Join me for coding tips, techniques for
            all things tech.
          </div>
        </div>
        <ButtonFollow />
      </Link>
    </div>
  );
};

export default memo(AuthorCard);
