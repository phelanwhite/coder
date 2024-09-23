import { useCommentStore } from "@/store/comment-store";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, memo, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/loader";

const CommentForm = ({ blogId }: { blogId: string }) => {
  const { createComment } = useCommentStore();
  const createCommentResult = useMutation({
    mutationFn: async () => {
      const response = await createComment({ comment, blog: blogId });
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setComment("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [comment, setComment] = useState("");
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentResult.mutate();
  };
  if (createCommentResult.isPending) return <Loader />;
  return (
    <div className="space-y-5">
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="space-y-2"
      >
        <textarea
          required
          className="input-field"
          placeholder="Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div>
          <button type="submit" className="btn-success text-xs">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(CommentForm);
