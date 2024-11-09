import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import { getTimeDisplayBlog } from "@/libs/utils/time";
import { useCommentStore } from "@/stores/comment-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import ReplyList from "./ReplyList";

const CommentCard = ({ data }: { data: any }) => {
  const [isReplyForm, setIsReplyForm] = useState(false);
  const [isShowReplies, setIsShowReplies] = useState(false);

  const { likeDislikeByCommentId } = useCommentStore();

  // like and unlike
  const [count_like, setCount_like] = useState(0);
  useEffect(() => {
    data?.likes?.length && setCount_like(data?.likes?.length);
  }, [data?.likes?.length]);
  const likeDislikeByCommentIdResult = useMutation({
    mutationFn: async () => {
      return await likeDislikeByCommentId(data?._id);
    },
    onSuccess: (data) => {
      setCount_like(data?.data?.likes?.length);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div>
      {/* top  */}
      <div className="flex gap-2 items-center">
        <div className="w-7 h-7 overflow-hidden rounded-full border">
          <img
            src={data?.author?.avatar || IMAGES_DEFAULT.account_notfound}
            alt=""
            loading="lazy"
          />
        </div>
        <div className="font-medium text-sm">{data?.author?.name}</div>
      </div>
      {/* comment  */}
      <div className="mt-2 p-4 rounded-xl bg-gray-50 whitespace-pre-wrap">
        <div className="text-xs font-medium text-text-secondary-color-2 pt-0.5">
          {data?.createdAt && getTimeDisplayBlog(new Date(data?.createdAt))}
        </div>
        {data?.comment}
      </div>
      {/* action  */}
      <div className="px-4 pt-2 flex items-center gap-3 text-sm">
        <button onClick={() => setIsReplyForm(!isReplyForm)}>Reply</button>
        <button
          onClick={() => likeDislikeByCommentIdResult.mutate()}
          className="flex items-center gap-1"
        >
          <AiOutlineLike /> <span>{count_like}</span>
        </button>
        <button
          onClick={() => setIsShowReplies(true)}
          className="flex items-center gap-1"
        >
          <AiOutlineComment />
          <span>{data?.count_reply}</span>
        </button>
      </div>
      {/* reply */}
      <div className="mt-4 pl-8 border-l">
        <ReplyList
          isOpenForm={isReplyForm}
          isOpenReplies={isShowReplies}
          data={data}
        />
      </div>
    </div>
  );
};

export default memo(CommentCard);
