import { IMAGES_DEFAULT } from "@/constants/images-constant";
import { useActionStore } from "@/stores/action-store";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

type Type = {
  data: any;
  setEdit: (id: string, value: string) => void;
};

const ActionCommentItem = ({ data, setEdit }: Type) => {
  const { deleteCommentById } = useActionStore();
  const deleteCommentByIdResult = useMutation({
    mutationFn: async (commentId: string) => {
      return await deleteCommentById(commentId);
    },
  });
  return (
    <div className="flex items-start gap-2">
      <div className="w-8 h-8 overflow-hidden rounded-full">
        <img
          src={data?.user?.avatar || IMAGES_DEFAULT.account_notfound}
          loading="lazy"
          alt=""
        />
      </div>
      <div className="flex-1 space-y-1">
        {/* user  */}
        <div className="space-x-1">
          <span className="font-medium">{data?.user?.name}</span>

          <span className="text-secondary">
            {new Date(data?.createdAt).toDateString()}
          </span>
        </div>
        <div className="ql-snow shadow bg-white rounded-lg">
          <div
            className="ql-editor w-full px-3 py-1.5"
            dangerouslySetInnerHTML={{ __html: data?.data }}
          ></div>
        </div>
        <div className="space-x-2 text-xs">
          <button onClick={() => setEdit(data?._id, data?.data)}>Edit</button>
          <button onClick={() => deleteCommentByIdResult.mutate(data?._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionCommentItem;
