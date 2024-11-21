import { IMAGES_DEFAULT } from "@/constants/images-constant";
import { useActionStore } from "@/stores/action-store";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, memo, useState } from "react";
import RichEditorReactQuillNew from "@/components/form/react-quill-new";
import ActionFileItem from "./ActionFileItem";
import ActionCommentItem from "./ActionCommentItem";

type Type = {
  idTask: string;
};

const ActionCommentList = ({ idTask }: Type) => {
  // user
  const { user } = useAuthStore();
  // comment
  const { createComment, updateCommentById, actions } = useActionStore();
  const [commentInput, setCommentInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState("");

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    isEdit ? updateCommentByIdResult.mutate() : createCommentResult.mutate();
  };
  const createCommentResult = useMutation({
    mutationFn: async () => {
      return await createComment(idTask, commentInput);
    },
    onSuccess() {
      setCommentInput("");
    },
  });
  const updateCommentByIdResult = useMutation({
    mutationFn: async () => {
      console.log({
        isEdit,
        idEdit,
        commentInput,
      });
      return await updateCommentById(idEdit, {
        data: commentInput,
      });
    },
    onSuccess() {
      setIsEdit(false);
      setIdEdit("");
      setCommentInput("");
    },
  });

  const handleEditComment = (id: string, value: string) => {
    setIsEdit(true);
    setIdEdit(id);
    setCommentInput(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 overflow-hidden rounded-full">
          <img
            src={user?.avatar || IMAGES_DEFAULT.account_notfound}
            loading="lazy"
            alt=""
          />
        </div>
        <div className="flex-1 space-y-1">
          <form
            onSubmit={onSubmit}
            action=""
            method="post"
            className="space-y-2"
          >
            <RichEditorReactQuillNew
              type="comment"
              value={commentInput}
              onChange={(e) => setCommentInput(e)}
            />
            <div>
              <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-xs text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {actions.map((item) => {
        if (item?.type === "file")
          return <ActionFileItem key={item?._id} data={item} />;
        if (item?.type === "comment")
          return (
            <ActionCommentItem
              key={item?._id}
              data={item}
              setEdit={handleEditComment}
            />
          );
      })}
    </div>
  );
};

export default memo(ActionCommentList);
