import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import { useCommentStore } from "@/stores/comment-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import ReplyList from "./ReplyList";
import { getTimeDisplay } from "@/libs/utils/time";
import Skeleton from "react-loading-skeleton";

export const CommentCard = ({ data }: { data: any }) => {
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
      <div className="flex items-start gap-2">
        {/* left  */}
        <div className="w-8 h-8 overflow-hidden rounded-full">
          <img
            src={data?.author?.avatar || IMAGES_DEFAULT.account_notfound}
            alt=""
            loading="lazy"
          />
        </div>
        {/* right */}
        <div className="flex-1">
          <div className="p-4 rounded border">
            {/* top  */}
            <div className="flex items-center gap-2 mb-4 text-text-secondary-color-2">
              <span className="font-medium">{data?.author?.name}</span>
              <span className="h-1 w-1 rounded-full bg-black overflow-hidden"></span>
              <span>
                {data?.createdAt && getTimeDisplay(new Date(data?.createdAt))}
              </span>
            </div>
            {/* comment  */}
            <div className="ql-snow">
              <div
                className="ql-editor p-0 leading-6"
                dangerouslySetInnerHTML={{ __html: data?.comment }}
              ></div>
            </div>
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
      </div>
    </div>
  );
};

export const CommentCardSkeleton = () => {
  return (
    <div>
      <div className="flex items-start gap-2">
        {/* left  */}
        <div className="w-8 h-8 overflow-hidden rounded-full">
          <div className="h-full w-full rounded-full bg-gray-500" />
        </div>
        {/* right */}
        <div className="flex-1">
          <div className="p-4 rounded border">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
          {/* action  */}
        </div>
      </div>
    </div>
  );
};
