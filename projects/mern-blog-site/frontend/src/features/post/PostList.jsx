import React, { memo } from "react";
import PostCard from "./PostCard";

const PostList = ({ data = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {data.map((item, index) => {
        return <PostCard key={item?._id} data={item} />;
      })}
    </div>
  );
};

export default memo(PostList);
