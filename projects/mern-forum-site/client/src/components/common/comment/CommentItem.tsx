import { Link } from "react-router-dom";
import CommentItemButtonMenu from "./CommentItemButtonMenu";
import { useAuthStore } from "@/stores/auth-store";
import { memo } from "react";

const CommentItem = ({ data }: { data: any }) => {
  const { user } = useAuthStore();
  return (
    <div>
      <div className="flex items-center gap-4 justify-between pb-2">
        <div className="text-text-secondary-color-2">
          {user?._id === data?.author?._id ? `You` : data?.author?.name}{" "}
          {data?.parentCommentIdOfBlogId ? (
            <>
              responded to {data?.parentCommentIdOfBlogId?.author?.name}'s
              comment on the article{" "}
              <Link
                to={`/blog/${data?.parentCommentIdOfBlogId?._id}`}
                className="font-medium"
              >
                {data?.parentCommentIdOfBlogId?.title}
              </Link>
            </>
          ) : (
            <>
              commented on the article{" "}
              <Link to={`/blog/${data?.blog?._id}`} className="font-medium">
                {data?.blog?.title}
              </Link>
            </>
          )}
        </div>
        <CommentItemButtonMenu data={data} />
      </div>
      <div className="bg-gray-100 rounded-lg px-4 py-2">
        <div className="text-text-secondary-color-2 text-xs mb-1">
          {new Date(data?.createdAt).toDateString()}
        </div>
        <div>{data?.comment}</div>
      </div>
    </div>
  );
};

export default memo(CommentItem);