import { MyQueriesResultButtonMenuType } from "@/constants/type";
import React, { memo } from "react";
import PostCard, { PostCardSkeleton } from "./post/PostCard";
import Paginate from "../form/paginate";
type Type = {
  datas: any[];
  menuType: MyQueriesResultButtonMenuType;

  loading: boolean;
  page: number;
  pageCount: number;
  onchagePage: (selectedItem: { selected: number }) => void;
};

const MyQueriesResultList = ({
  datas,
  menuType,

  loading,
  onchagePage,
  page,
  pageCount,
}: Type) => {
  if (loading)
    return (
      <div className="space-y-8">
        {Array(5)
          .fill(0)
          .map((i, idx) => (
            <PostCardSkeleton key={idx} />
          ))}
      </div>
    );
  return (
    <div>
      {datas?.length === 0 && (
        <div className="text-center text-sm">No results found.</div>
      )}
      {datas?.length > 0 && (
        <div className="space-y-8">
          {datas?.map((item) => {
            if (item?.type === "post")
              return (
                <PostCard
                  key={item?._id}
                  data={item?.data}
                  menuData={item}
                  menuType={menuType}
                />
              );
          })}
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

export default memo(MyQueriesResultList);
