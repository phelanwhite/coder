import React, { FC, memo } from "react";
import CommentForm from "./CommentForm";
import { useQuery } from "@tanstack/react-query";
import { useCommentStore } from "@/stores/comment-store";
import CommentCard from "./CommentCard";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { Link } from "react-router-dom";

interface Props {
  id: string;
}

const CommentList: FC<Props> = ({ id }) => {
  const { comments, getCommentsByBlogId } = useCommentStore();
  const getCommentsByBlogIdResult = useQuery({
    queryKey: ["blog", "comments", id],
    queryFn: async () => {
      return await getCommentsByBlogId(id as string);
    },
    enabled: !!id,
  });
  return (
    <div className="space-y-6">
      <CommentForm type_id={id as string} type="blog" />
      {comments?.map((item: any) => (
        <CommentCard key={item?._id} data={item} />
      ))}
      <div className="text-center underline text-blue-500">
        {getCommentsByBlogIdResult.data?.data?.total_page > 1 && (
          <Link to={`comment`}>View all comment</Link>
        )}
      </div>
    </div>
  );
};

export default memo(CommentList);
