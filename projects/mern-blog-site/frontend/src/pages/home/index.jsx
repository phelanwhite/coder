import React from "react";
import HomeBanner from "./HomeBanner";
import PostList from "features/post/PostList";
import { usePost_get_allQuery } from "features/post/postApi";

const HomePage = () => {
  const getPostAll = usePost_get_allQuery({ params: "" });
  return (
    <div className="flex flex-col gap-6">
      <HomeBanner />
      <div>
        <div className="font-semibold text-xl mb-4">Top rated post</div>
        <PostList data={getPostAll.data} />
      </div>
      <div>
        <div className="font-semibold text-xl mb-4">All blog posts</div>
        <PostList data={getPostAll.data} />
        <PostList data={getPostAll.data} />
        <PostList data={getPostAll.data} />
        <PostList data={getPostAll.data} />
      </div>
    </div>
  );
};

export default HomePage;
