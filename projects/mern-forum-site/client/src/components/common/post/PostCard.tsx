import { getDateToString } from "@/utils/time";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { MdOutlineModeComment } from "react-icons/md";
import ButtonBookmark from "../bookmark/ButtonBookmark";
import PostButtonMenu from "./PostButtonMenu";
import clsx from "clsx";
import { PostButtonMenuType, PostType } from "@/constants/type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Type = {
  data?: PostType;
  typePost?: "post1" | "post2" | "post3";

  menuData?: any;
  menuType?: PostButtonMenuType;
};

const PostCard = ({ data, typePost, menuData, menuType }: Type) => {
  return (
    <div className="px-5">
      {/* author  */}
      <div>
        <Link
          to={`/author/${data?.user?._id}`}
          className="flex items-center gap-2 text-xs hover:underline"
        >
          <div className="w-5 h-5 overflow-hidden rounded-full">
            <img src={data?.user?.avatar} loading="lazy" alt="" />
          </div>
          <div>
            <span>{data?.user?.name}</span>
          </div>
        </Link>
      </div>
      {/* main  */}
      <div
        className={clsx(
          "mt-2 flex items-start",
          typePost === "post3" ? "flex-col-reverse gap-4" : "gap-8 md:gap-14"
        )}
      >
        {/* left  */}
        <div className="flex-1 space-y-4 leading-5">
          {/* post detail  */}
          <Link to={`/post/${data?._id}`}>
            <div className="space-y-1">
              <div
                className={clsx(
                  "font-bold text-bases line-clamp-3",
                  typePost === "post2" ? "text-base" : "text-xl"
                )}
              >
                {data?.title}
              </div>
              <div
                className={clsx(
                  "text-text-secondary-color text-sm line-clamp-2",
                  typePost === "post2" && "hidden"
                )}
              >
                {data?.content}
              </div>
            </div>
          </Link>
          {/* footer  */}
          <div
            className={clsx(
              "flex items-center justify-between",
              typePost === "post2" && "hidden"
            )}
          >
            <div className="text-text-secondary-color text-xs flex items-center gap-3">
              <span>{getDateToString(new Date().toDateString())}</span>
              <span className="flex items-center ">
                <PiHandsClappingDuotone />
                115
              </span>
              <span className="flex items-center ">
                <MdOutlineModeComment />
                15
              </span>
            </div>
            {/* action  */}
            <div className="flex items-center gap-3 text-xl">
              <ButtonBookmark
                isBookmark={data?.isBookmark as boolean}
                data={data?._id as string}
                type="post"
              />
              <PostButtonMenu data={menuData} menuType={menuType} />
            </div>
          </div>
        </div>
        {/* right  */}
        <Link to={`/post/${data?._id}`}>
          <div
            className={clsx(
              "overflow-hidden rounded-sm ",
              typePost === "post2" && "hidden",
              typePost === "post3"
                ? "aspect-video"
                : "w-20 h-12 md:w-40 md:h-25"
            )}
          >
            <img src={data?.thumbnail} loading="lazy" alt="" />
          </div>
        </Link>
      </div>
      <hr
        className={clsx(
          "mt-8",
          (typePost === "post2" || typePost === "post3") && "hidden"
        )}
      />
    </div>
  );
};

export const PostCardSkeleton = () => {
  return (
    <div className="px-5">
      <div>
        <Skeleton circle height={20} width={20} />
      </div>
      <div className="flex items-start gap-8 md:gap-14">
        <div className="flex-1">
          <Skeleton count={2} />
          <Skeleton count={3} />
        </div>
        <div>
          <Skeleton className="w-20 h-12 md:w-40 md:h-25" />
        </div>
      </div>
      <hr className="mt-8" />
    </div>
  );
};

export default memo(PostCard);
