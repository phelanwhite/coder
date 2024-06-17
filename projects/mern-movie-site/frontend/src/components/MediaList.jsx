import React, { memo } from "react";
import MediaCard from "./MediaCard";

const MediaList = ({ media_list = [], media_type }) => {
  if (media_list.length === 0) return <div>Not found result</div>;
  return (
    <div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xxl:grid-cols-7">
        {media_list.map((media) => {
          return (
            <MediaCard key={media.id} media={media} media_type={media_type} />
          );
        })}
      </div>
    </div>
  );
};

export default memo(MediaList);
