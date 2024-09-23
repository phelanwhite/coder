import { images } from "@/assets/constants";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import ListItemMenu from "./ListItemMenu";
import clsx from "clsx";

const ListItem = ({ data }: { data: any }) => {
  return (
    <div className="bg-bgSecondaryColor p-6 rounded space-y-4">
      {/* author  */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-5 h-5 rounded-full overflow-hidden">
            <img
              src={data?.author?.avatar || images.account_notfound}
              loading="lazy"
              alt=""
            />
          </div>
          <Link
            to={`/author-id/${data?.author?._id}`}
            className="font-medium text-link"
          >
            {data?.author?.name}
          </Link>
        </div>
        <span
          className={clsx(
            "inline-block text-xs text-white px-1.5 rounded-full",
            data?.status ? "bg-green-500" : "bg-gray-500"
          )}
        >
          {data?.status ? `Published` : `Private`}
        </span>
      </div>
      <div>
        <Link
          to={`/list-id/${data?._id}`}
          className="font-bold text-xl text-link"
        >
          {data?.title}
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-textSecondaryColor">
          {data?.blogs?.length
            ? `${data?.blogs?.length} stories`
            : `No stories`}
        </div>
        <ListItemMenu data={data} />
      </div>
    </div>
  );
};

export default memo(ListItem);
