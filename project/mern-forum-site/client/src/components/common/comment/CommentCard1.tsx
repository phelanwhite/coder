import IMAGES_DEFAULT from "@/assets/constants/image";
import { useCommentStore } from "@/stores/comment-store";
import { memo, useEffect, useMemo, useState } from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import CommentForm from "./CommentForm";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import axiosConfig from "@/configs/axios-config";
import { getTimeDisplayBlog } from "@/libs/utils/time";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const CommentCard1 = ({ data }: { data: any }) => {
  const { replies, likeDislikeByCommentId, getRepliesByCommentId } =
    useCommentStore();
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

  const [isReplyComment, setIsReplyComment] = useState(false);
  const [isReplyView, setIsReplyView] = useState(false);

  const getRepliesResult = useInfiniteQuery({
    queryKey: ["replies", data?._id],
    queryFn: async ({ pageParam }) => {
      return await getRepliesByCommentId(data?._id);
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage?.data?.result?.length) {
        return lastPageParam + 1;
      } else {
        return undefined;
      }
    },
    placeholderData: keepPreviousData,
    enabled: !!isReplyView,
  });

  const [repliesData, setRepliesData] = useState<any[]>([]);
  useEffect(() => {
    setRepliesData(replies);
  }, []);
  console.log({ repliesData });

  const { id } = useParams();

  return (
    <div>
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 overflow-hidden rounded-full">
            <img
              src={data?.author?.avatar || IMAGES_DEFAULT.account_notfound}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="font-medium text-sm">{data?.author?.name}</div>
          <div className="text-xs font-medium text-text-secondary-color-2 pt-0.5">
            {getTimeDisplayBlog(new Date(data?.createdAt))}
          </div>
        </div>
        <div className="mt-2 p-4 rounded-xl bg-gray-50 whitespace-pre-wrap">
          {data?.comment}
        </div>
        <div className="px-4 py-2 flex items-center gap-3 text-sm">
          <button
            onClick={() => likeDislikeByCommentIdResult.mutate()}
            className="flex items-center gap-1"
          >
            <AiOutlineLike /> <span>{count_like}</span>
          </button>
          <button
            onClick={() => setIsReplyComment(!isReplyComment)}
            className="flex items-center gap-1"
          >
            <AiOutlineComment />
            <span>{data?.dislikes}</span>
          </button>
        </div>
      </div>
      <div className="pl-8 mb-4">
        {data?.count_reply > 0 && (
          <div className="flex items-center gap-4 mb-3">
            <hr className="flex-1" />
            <button
              onClick={() => setIsReplyView(!isReplyView)}
              className="text-text-secondary-color-2 text-sm"
            >
              view {data?.count_reply} replies
            </button>
            <hr className="flex-1" />
          </div>
        )}

        {isReplyComment && (
          <div className="mb-3">
            <CommentForm
              isReply={true}
              parentCommentId={data?._id}
              parentCommentIdOfBlogId={id}
            />
          </div>
        )}

        {isReplyView && (
          <div className="">
            {repliesData?.map((item: any) => {
              return <CommentCard1 key={item?._id} data={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CommentCard1);
