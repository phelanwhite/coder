import TextEditor from "@/components/form/text-editor";
import { useCommentStore } from "@/stores/comment-store";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FC, memo, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  type_id: string;
  type: "blog" | "series";
}
const CommentForm: FC<Props> = ({ type_id, type }) => {
  const { createComment } = useCommentStore();
  const createCommentResult = useMutation({
    mutationFn: async () => {
      return await createComment({
        comment,
        [type]: type_id,
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

  return (
    <div>
      <form
        onSubmit={onSubmit}
        action=""
        method="post"
        className="flex flex-col gap-2"
      >
        <TextEditor
          type="comment"
          value={comment}
          onChange={(e) => setComment(e)}
        />
        <div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(CommentForm);
