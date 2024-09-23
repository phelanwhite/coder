// import { useCommentStore } from "@/store/comment-store";
import { useQuery } from "@tanstack/react-query";
import { memo, useState } from "react";
import Loader from "../layout/loader";
import CommentCard from "./CommentCard";
import { useCommentStore } from "@/store/comment-store";

const CommentListBlog = ({ blogId }: { blogId: string }) => {
  const { comments, getCommentsByBlogId } = useCommentStore();
  const getCommentsByBlogIdResult = useQuery({
    queryKey: ["comments-by-blog-id", blogId],
    queryFn: async () => {
      const response = await getCommentsByBlogId(blogId);
      return response;
    },
    enabled: !!blogId,
  });

  if (getCommentsByBlogIdResult.isLoading) return <Loader />;

  if (comments.length > 0) {
    return (
      <>
        {comments?.map((item: any) => (
          <CommentCard key={item?._id} data={item} />
        ))}
      </>
    );
  } else {
    return <div>No comment</div>;
  }
};

export default memo(CommentListBlog);
