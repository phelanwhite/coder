import IMAGES_DEFAULT from "@/assets/constants/image";
import { getTimeDisplayBlog } from "@/libs/utils/time";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { useCommentStore } from "@/stores/comment-store";
import toast from "react-hot-toast";

const CommentCard = ({ data }: { data: any }) => {
  const { getRepliesByCommentId, createReply, likeDislikeByCommentId } =
    useCommentStore();

  const [isReply, setIsReply] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [replieValue, setReplieValue] = useState("");
  const [repliesData, setRepliesData] = useState<any[]>([]);

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

  // create reply
  const createReplyResult = useMutation({
    mutationFn: async () => {
      return await createReply({
        comment: replieValue,
        parentCommentId: data?._id,
        parentCommentIdOfBlogId: data?.blog,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setRepliesData((prev) => [data?.data, ...prev]);
      setReplieValue("");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createReplyResult.mutate();
  };

  // get all replies
  const getRepliesByCommentIdResult = useInfiniteQuery({
    queryKey: ["replies", data?._id],
    queryFn: async ({ pageParam }) => {
      return await getRepliesByCommentId(data?._id, `_page=${pageParam}`);
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
    enabled: !!(isComment && data?.count_reply),
  });
  useEffect(() => {
    const newRepliesData = getRepliesByCommentIdResult.data?.pages
      ?.map((item) => item?.data?.result)
      ?.flat(1);
    newRepliesData && setRepliesData(newRepliesData);
  }, [getRepliesByCommentIdResult.data]);

  return (
    <div>
      {/* comment  */}
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
        {/* actions */}
        <div className="px-4 pt-2 flex items-center gap-3 text-sm">
          <button onClick={() => setIsReply(!isReply)}>Reply</button>
          <button
            onClick={() => likeDislikeByCommentIdResult.mutate()}
            className="flex items-center gap-1"
          >
            <AiOutlineLike /> <span>{count_like}</span>
          </button>
          <button
            onClick={() => setIsComment(true)}
            className="flex items-center gap-1"
          >
            <AiOutlineComment />
            <span>{data?.count_reply}</span>
          </button>
        </div>
      </div>
      {/* reply */}
      <div className="mt-4 space-y-4 pl-10 border-l">
        {/* form  */}
        {isReply && (
          <form onSubmit={onSubmit} action="" method="post">
            <textarea
              required
              name=""
              id=""
              className="mb-1 px-4 py-2 rounded-lg border w-full focus:outline-blue-500"
              placeholder="Enter your new comment"
              value={replieValue}
              onChange={(e) => setReplieValue(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-success text-xs">
              Submit
            </button>
          </form>
        )}
        {/* list  */}
        {repliesData?.map((item: any) => (
          <CommentCard key={item?._id} data={item} />
        ))}
        {repliesData.length > 0 && (
          <div className="text-center">
            <button
              className="text-xs text-blue-500"
              onClick={() => {
                getRepliesByCommentIdResult.fetchNextPage();
              }}
              disabled={
                !getRepliesByCommentIdResult.hasNextPage ||
                getRepliesByCommentIdResult.isFetchingNextPage
              }
            >
              {getRepliesByCommentIdResult.isFetchingNextPage
                ? "Loading more..."
                : getRepliesByCommentIdResult.hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CommentCard);
