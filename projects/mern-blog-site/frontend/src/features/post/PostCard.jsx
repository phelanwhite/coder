import React, { memo } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ data }) => {
  return (
    <div>
      <Link to={`/post-id/${data?._id}`}>
        <div className="aspect-video w-full">
          <img src={data?.thumbnail} loading="lazy" alt="" />
        </div>
      </Link>
      <div className="mt-4 flex flex-col gap-2">
        <div className="text-xs font-medium">
          {new Date(data?.updatedAt).toDateString()}
        </div>
        <Link
          to={`/post-id/${data?._id}`}
          className="line-clamp-1 font-semibold text-base"
        >
          {data?.name}
        </Link>
        <div
          className="line-clamp-2 text-secondaryColor"
          dangerouslySetInnerHTML={{ __html: data?.desc_short }}
        ></div>
        <div className="flex flex-wrap gap-2 line-clamp-1">
          {data?.tags
            ?.split(",")
            ?.filter((item) => item)
            ?.map((item) => (
              <Link
                key={item}
                to={`/search?tags=${item}`}
                className="px-2 py-0.5 bg-purple-100 text-purple-500 text-xs font-medium rounded-md"
              >
                {item}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default memo(PostCard);
