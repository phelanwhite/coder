import { FC, memo } from "react";

import { Link } from "react-router-dom";
import { CommentCard, CommentCardSkeleton } from "./CommentCard";

type Type = {
  datas: any[];
  isLoading: boolean;
};

const CommentCardList = ({ datas, isLoading }: Type) => {
  // const { comments, getCommentsByBlogId } = useCommentStore();
  // const getCommentsByBlogIdResult = useQuery({
  //   queryKey: ["blog", "comments", id],
  //   queryFn: async () => {
  //     return await getCommentsByBlogId(id as string);
  //   },
  //   enabled: !!id,
  // });

  if (isLoading)
    return (
      <div className="space-y-4">
        {Array(20)
          .fill(0)
          .map((_, index) => {
            return <CommentCardSkeleton key={index} />;
          })}
      </div>
    );

  return (
    <div className="space-y-6">
      {/* <CommentForm type_id={id as string} type="blog" /> */}
      {datas.length > 0 ? (
        datas?.map((item: any) => <CommentCard key={item?._id} data={item} />)
      ) : (
        <div>No comment.</div>
      )}
    </div>
  );
};

export default memo(CommentCardList);
