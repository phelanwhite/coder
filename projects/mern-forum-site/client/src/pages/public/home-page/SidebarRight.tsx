import AuthorCard from "@/components/common/author/AuthorCard";
import PostCard from "@/components/common/post/PostCard";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const SidebarRight = () => {
  return (
    <div className="max-w-screen-xs w-full space-y-10 hidden md:block">
      {/* staff picks  */}
      <ul className="space-y-5">
        <li className="px-5 capitalize text-base font-semibold">staff picks</li>
        <li>
          <PostCard typePost="post2" />
        </li>
        <li>
          <PostCard typePost="post2" />
        </li>
        <li>
          <PostCard typePost="post2" />
        </li>
        <li>
          <PostCard typePost="post2" />
        </li>
        <li>
          <PostCard typePost="post2" />
        </li>
        <li className="px-5 text-text-secondary-color text-sm font-medium hover:underline">
          <Link to={`/`}>See the full list</Link>
        </li>
      </ul>
      {/* Recommended topics  */}
      <ul className="space-y-5">
        <li className="px-5 capitalize text-base font-semibold">
          Recommended topics
        </li>
        <li className="px-5">
          <ul className="flex flex-wrap items-center gap-2">
            {[
              `Artificial Intelligence`,
              `Python`,
              `JavaScript`,
              `Coding`,
              `React`,
            ].map((item) => (
              <li key={item}>
                <Link
                  className="inline-block text-xs px-4 py-2 rounded-full overflow-hidden bg-gray-100 hover:bg-gray-200"
                  to={`/`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="px-5 text-text-secondary-color text-sm font-medium hover:underline">
          <Link to={`/`}>See more topics</Link>
        </li>
      </ul>
      {/* Who to follow  */}
      <ul className="space-y-5">
        <li className="px-5 capitalize text-base font-semibold">
          Who to follow
        </li>
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
          <Link to={`/`}>See more suggestions</Link>
        </li>
      </ul>
      {/* Recently saved  */}
      <ul className="space-y-5">
        <li className="px-5 capitalize text-base font-semibold">
          Recently saved
        </li>
        <li>
          <PostCard typePost="post2" />
        </li>
        <li>
          <PostCard typePost="post2" />
        </li>
        <li>
          <PostCard typePost="post2" />
        </li>
        <li className="px-5 text-text-secondary-color text-sm font-medium hover:underline">
          <Link to={`/`}>See all</Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(SidebarRight);
