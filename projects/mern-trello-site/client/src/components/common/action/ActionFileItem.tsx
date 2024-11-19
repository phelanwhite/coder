import { IMAGES_DEFAULT } from "@/constants/images-constant";
import React from "react";
import { Link } from "react-router-dom";

const ActionFileItem = ({ data }: { data: any }) => {
  return (
    <div className="flex items-start gap-2">
      <div className="w-8 h-8 overflow-hidden rounded-full">
        <img
          src={data?.user?.avatar || IMAGES_DEFAULT.account_notfound}
          loading="lazy"
          alt=""
        />
      </div>
      <div className="flex-1 space-y-1">
        {/* user  */}
        <div className="space-x-1">
          <span className="font-medium">{data?.user?.name}</span>
          <span className="text-secondary">uploaded the file</span>
          <a
            className="underline text-blue-500 font-medium"
            href={data?.data?.url}
            target="_blank"
          >
            {data?.data?.url}
          </a>
          <span className="text-secondary">
            on {new Date(data?.createdAt).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActionFileItem;
