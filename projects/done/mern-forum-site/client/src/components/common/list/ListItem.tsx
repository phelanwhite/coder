import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import ListItemButtonMenu from "./ListItemButtonMenu";

export const ListItem = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="bg-gray-100 rounded flex flex-col sm:flex-row">
        <div className="space-y-4 p-5 flex-1">
          <div className="flex items-center gap-2 font-medium text-xs">
            <div className="w-5 h-5 rounded-full overflow-hidden">
              <img
                src={data?.author?.avatar || IMAGES_DEFAULT.account_notfound}
                loading="lazy"
                alt=""
              />
            </div>
            <span>{data?.author?.name}</span>
          </div>
          <Link
            to={`/me/list/${data?._id}`}
            className="line-clamp-2 font-bold text-xl"
          >
            {data?.title}
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary-color-2">
              {data?.count_blog} blog
            </span>
            <ListItemButtonMenu data={data} />
          </div>
        </div>
        <div className="flex-1 flex gap-0.5 max-h-[100px] md:max-h-[140px]">
          <div className="flex-[4] bg-gray-200">
            {data?.imageBlogs?.[0] && (
              <img src={data?.imageBlogs?.[0]} loading="lazy" alt="" />
            )}
          </div>
          <div className="flex-[2] bg-gray-200">
            {data?.imageBlogs?.[1] && (
              <img src={data?.imageBlogs?.[1]} loading="lazy" alt="" />
            )}
          </div>
          <div className="flex-[1] bg-gray-200">
            {data?.imageBlogs?.[2] && (
              <img src={data?.imageBlogs?.[2]} loading="lazy" alt="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListItemSkeleton = () => {
  return (
    <div>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};
