import { Link } from "react-router-dom";
import CommentItemButtonMenu from "./CommentItemButtonMenu";
import { useAuthStore } from "@/stores/auth-store";

const CommentItem = ({ data }: { data: any }) => {
  const { user } = useAuthStore();
  return (
    <div>
      <div className="flex items-center gap-4 justify-between pb-2">
        <div className="text-text-secondary-color-2">
          {user?._id === data?.author?._id ? `You` : data?.author?.name}{" "}
          commented on the article{" "}
          <Link to={`/blog/${data?.blog?._id}`} className="font-medium">
            {data?.blog?.title}
          </Link>
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

export default CommentItem;
