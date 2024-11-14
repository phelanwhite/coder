import { getTimeDisplay } from "@/libs/utils/time";
import { useAuthStore } from "@/stores/auth-store";
import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import CommentItemButtonMenu from "./CommentItemButtonMenu";
import Skeleton from "react-loading-skeleton";

interface Props {
  data: any;
}

export const CommentItem: FC<Props> = ({ data }) => {
  const { user } = useAuthStore();

  return (
    <div key={data?._id} className="p-4 bg-gray-100 rounded">
      <div className="flex items-start justify-between gap-4">
        <div className="text-text-secondary-color-2">
          <div>
            <span>
              {data?.author?._id === user?._id ? "You" : data?.author?.name}
            </span>{" "}
            {data?.reply?.type_id ? (
              <>
                <span>reply on the article </span>{" "}
                <Link
                  className="italic text-blue-500"
                  to={`/blog/${data?.reply?.type_id?._id}`}
                >
                  {data?.reply?.type_id?.title}
                </Link>{" "}
                <span>
                  on{" "}
                  {data?.createdAt && getTimeDisplay(new Date(data?.createdAt))}
                </span>
              </>
            ) : (
              <>
                <span>commented on the article </span>{" "}
                <Link
                  className="italic text-blue-500"
                  to={`/blog/${data?.blog?._id}`}
                >
                  {data?.blog?.title}
                </Link>{" "}
                <span>
                  on{" "}
                  {data?.createdAt && getTimeDisplay(new Date(data?.createdAt))}
                </span>
              </>
            )}
          </div>
        </div>
        <CommentItemButtonMenu data={data} />
      </div>
      <div>
        <div className="text-text-secondary-color-2 text-xs"></div>
        <div className="ql-snow">
          <div
            className="ql-editor p-0 leading-6"
            dangerouslySetInnerHTML={{ __html: data?.comment }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export const CommentItemSkeleton = () => {
  return (
    <div>
      <Skeleton />
      <Skeleton />
    </div>
  );
};
