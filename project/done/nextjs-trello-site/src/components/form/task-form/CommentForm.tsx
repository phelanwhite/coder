"use client";
import Loader from "@/components/feedback/loader";
import { useCommentContext } from "@/context/commentContext";
import { useCommentStore } from "@/store/comment-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CommentForm = ({ id }: { id: string }) => {
  const { isEdit, dataEdit, setIsEdit, setDataEdit } = useCommentContext();
  const { createComment, updateCommentById } = useCommentStore();
  const createUpdateCommentResult = useMutation({
    mutationFn: async (comment: string) => {
      if (isEdit) {
        await updateCommentById(dataEdit?.id, {
          comment: comment,
        });
      } else {
        await createComment({
          taskId: id,
          comment: comment,
        });
      }
    },
    onSuccess: (data) => {
      isEdit
        ? toast.success("Comment updated successfully!")
        : toast.success("Comment created successfully!");
      setComment("");
      setIsEdit(false);
      setDataEdit(null);
    },
    onError: (error) => {
      console.log({ error });
      toast.error("Comment created failed!");
    },
  });
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (isEdit && dataEdit) {
      setComment(dataEdit?.comment);
    }
  }, [isEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUpdateCommentResult.mutate(comment);
  };

  if (createUpdateCommentResult.isPending) return <Loader />;
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="form-field"
        placeholder="Write comment..."
      />
      <div className="space-x-4">
        <button
          type="submit"
          className="px-3 py-1.5 inline-block rounded bg-blue-500 text-white"
        >
          Comment
        </button>
        {isEdit && (
          <button
            onClick={() => {
              setComment("");
              setIsEdit(false);
              setDataEdit(null);
            }}
            type="button"
            className="px-3 py-1.5 inline-block rounded bg-red-500 text-white"
          >
            Close
          </button>
        )}
      </div>
    </form>
  );
};

export default memo(CommentForm);
