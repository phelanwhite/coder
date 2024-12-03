import React, { memo } from "react";
import PostCard, { PostCardSkeleton } from "./post/PostCard";
import Paginate from "../form/paginate";
import AuthorCard from "./author/AuthorCard";

type Type = {
  datas: any[];
  searchType: "posts" | "lists" | "authors" | "tags";

  loading: boolean;
  page: number;
  pageCount: number;
  onchagePage: (selectedItem: { selected: number }) => void;
};

const SearchResultsList = ({
  datas,
  searchType,

  page,
  pageCount,
  onchagePage,
  loading,
}: Type) => {
  if (loading)
    return (
      <div className="space-y-8">
        {searchType === "posts" &&
          Array(5)
            .fill(0)
            .map((i, idx) => <PostCardSkeleton key={idx} />)}
      </div>
    );
  return (
    <div>
      {datas?.length === 0 && (
        <div className="text-center text-sm">No results found.</div>
      )}
      {datas?.length > 0 && (
        <div className="space-y-8">
          {searchType === "posts" &&
            datas?.map((item) => (
              <PostCard
                key={item?._id}
                data={item}
                menuData={item}
                menuType="Card"
              />
            ))}
          {searchType === "authors" &&
            datas?.map((item) => <AuthorCard key={item?._id} data={item} />)}

          <Paginate
            forcePage={page - 1}
            onPageChange={onchagePage}
            pageCount={pageCount}
          />
        </div>
      )}
    </div>
  );
};

export default memo(SearchResultsList);
