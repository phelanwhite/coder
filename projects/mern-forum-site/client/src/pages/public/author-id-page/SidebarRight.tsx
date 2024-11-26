import AuthorCard from "@/components/common/author/AuthorCard";
import ButtonFollow from "@/components/common/follow/ButtonFollow";
import { memo } from "react";
import { Link } from "react-router-dom";

const SidebarRight = () => {
  return (
    <div className="space-y-10">
      {/* info  */}
      <div className="px-5 space-y-2">
        <div className="w-16 h-16 overflow-hidden rounded-full">
          <img
            src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*Kt_kIt2U-AuDbXK578LTDg.png"
            loading="lazy"
            alt=""
          />
        </div>
        <div className="font-medium text-base">Monique McIntyre</div>
        <div className="text-sm text-text-secondary-color">
          51 <Link to={`followers`}>followers</Link>
        </div>
        <div className="text-xs text-text-secondary-color">
          just a dev trying to help other devs
        </div>
        <div>
          <ButtonFollow />
        </div>
      </div>

      {/* Following */}
      <ul className="space-y-5">
        <li className="px-5 capitalize text-base font-semibold">Following</li>
        <ul className="px-5 space-y-5">
          <li>
            <AuthorCard />
          </li>
          <li>
            <AuthorCard />
          </li>
          <li>
            <AuthorCard />
          </li>
        </ul>
        <li className="px-5 text-text-secondary-color text-sm font-medium hover:underline">
          <Link to={`/`}>See all</Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(SidebarRight);
