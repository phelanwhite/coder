import { useCommentStore } from "@/stores/comment-store";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FC, memo, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../loader";

interface Props {
  blogId: string;
}
const CommentForm: FC<Props> = ({ blogId }) => {
  const { createComment } = useCommentStore();
  const createCommentResult = useMutation({
    mutationFn: async () => {
      return await createComment({
        comment,
        blog: blogId,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setComment("");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const [comment, setComment] = useState("");

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentResult.mutate();
  };

  if (createCommentResult.isPending) return <Loader />;

  return (
    <div>
      <form onSubmit={onSubmit} action="" method="post">
        <textarea
          required
          name=""
          id=""
          className="mb-1 px-4 py-2 rounded-lg border w-full focus:outline-blue-500"
          placeholder="Enter your new comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default memo(CommentForm);
