import CommentForm from "./CommentForm";
import { useCommentStore } from "@/stores/comment-store";
import { useQuery } from "@tanstack/react-query";
import CommentCard1 from "./CommentCard1";
import Loader from "../loader";
import { Link } from "react-router-dom";

const CommentListByBlogId = ({ id }: { id: string }) => {
  const { comments, total_comments, getCommentsByPostId } = useCommentStore();
  const getCommentByBlogIdResult = useQuery({
    queryKey: ["blog", "id", "comment", id],
    queryFn: async () => {
      return getCommentsByPostId(id as string);
    },
    enabled: !!id,
  });
  if (getCommentByBlogIdResult.isLoading) return <Loader />;
  return (
    <div className="space-y-6">
      <div className="font-semibold text-xl ">
        Comment top ({total_comments})
      </div>
      <CommentForm id={id as string} />
      {comments.length > 0 ? (
        <>
          {comments?.map((item: any) => {
            return <CommentCard1 key={item._id} data={item} />;
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

export default CommentListByBlogId;
