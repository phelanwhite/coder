import { useCommentStore } from "@/stores/comment-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { FormEvent, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/loader";
import { MediaType } from "@/assets/types/media-type";
import CommentCard from "./CommentCard";

type Type = {
  media_id: string;
  media_type: MediaType;
};

const CommentList = ({ media_id, media_type }: Type) => {
  const [formValue, setFormValue] = useState({
    comment: "",
    media_id: "",
    media_type: "",
  });
  useEffect(() => {
    setFormValue((prev) => ({ ...prev, media_id, media_type }));
  }, [media_id, media_type]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentResult.mutate();
  };
  const { comments, createComment } = useCommentStore();
  const createCommentResult = useMutation({
    mutationFn: async () => {
      return await createComment(formValue);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (createCommentResult.isPending) return <Loader />;

  return (
    <div>
      <div className="capitalize text-xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
        Comment
      </div>
      <form
        action=""
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <textarea
          required
          name=""
          id=""
          placeholder="Write comment..."
          className="input"
          value={formValue.comment}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, comment: e.target.value }))
          }
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="flex flex-col gap-4">
        {comments?.map((comment) => (
          <CommentCard data={comment} key={comment._id} />
        ))}
      </div>
    </div>
  );
};

export default memo(CommentList);
