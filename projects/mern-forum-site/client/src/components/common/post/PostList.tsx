import { memo } from "react";
import PostCard, { PostCardSkeleton } from "./PostCard";
import Paginate from "@/components/form/paginate";
import { PostButtonMenuType, PostType } from "@/constants/type";
import PostButtonMenu from "./PostButtonMenu";

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
        <div className="text-center text-sm">No posts found.</div>
      )}
      {datas.length > 0 && (
        <div className="space-y-8">
          {datas?.map((item) => (
            <PostCard
              key={item?._id}
              data={item}
              menuData={item}
              menuType={menuType}
            />
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

export default memo(PostList);
