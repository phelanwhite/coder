import CommentForm from "./CommentForm";
import { useCommentStore } from "@/stores/comment-store";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import { memo } from "react";

const CommentListByBlogId = ({ id }: { id: string }) => {
  const { comments, total_comments, getCommentsByPostId } = useCommentStore();
  const getCommentByBlogIdResult = useQuery({
    queryKey: ["blog", "id", "comment", id],
    queryFn: async () => {
      return getCommentsByPostId(id as string);
    },
    enabled: !!id,
  });

  return (
    <div className="space-y-8">
      <div className="font-semibold text-xl ">
        Comment top ({total_comments})
      </div>
      <CommentForm blogId={id as string} />
      {comments.length > 0 ? (
        <>
          {comments?.map((item: any) => {
            return (
              <div key={item._id}>
                <CommentCard data={item} />
              </div>
            );
          })}
          <div className="text-center text-sm">
            <Link to={`comment`}>View more</Link>
          </div>
        </>
      ) : (
        <div>No Comment</div>
      )}
    </div>
  );
};

export default memo(CommentListByBlogId);
