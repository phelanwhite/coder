import React from "react";
import PostCard from "./PostCard";
import Loader from "@/components/form/loader";
import Paginate from "@/components/form/paginate";
import { PostButtonMenuType, PostType } from "@/constants/type";

type Type = {
  datas: PostType[];
  menuType: PostButtonMenuType;
  loading: boolean;
  page: number;
  pageCount: number;
  onchagePage: (selectedItem: { selected: number }) => void;
};

const PostList = ({
  datas,
  loading,
  onchagePage,
  page,
  pageCount,
  menuType,
}: Type) => {
  return (
    <div>
      {loading && <Loader />}
      {datas?.length === 0 && (
        <div className="text-center text-sm">No posts found.</div>
      )}
      {pageCount > 1 && (
        <div className="space-y-8">
          {datas?.map((item) => (
            <PostCard key={item?._id} data={item} menuType={menuType} />
          ))}
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

export default PostList;
