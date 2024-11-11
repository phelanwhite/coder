import { useCommentStore } from "@/stores/comment-store";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import React, { ChangeEvent, FC, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CommentCard } from "./CommentCard";
import TextEditor from "@/components/form/text-editor";

interface Props {
  data: any;
  isOpenForm: boolean;
  isOpenReplies: boolean;
}

const ReplyList: FC<Props> = ({ data, isOpenForm, isOpenReplies }) => {
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<any[]>([]);
  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createReplyResult.mutate();
  };
  const { createReply, getRepliesByCommentId } = useCommentStore();
  //   reply
  const createReplyResult = useMutation({
    mutationFn: async () => {
      if (data?.reply?.type) {
        return await createReply({
          comment: replyContent,
          reply: {
            comment_id: data?._id,
            type_id: data?.reply?.type_id,
            type: data?.reply?.type,
          },
        });
      } else {
        return await createReply({
          comment: replyContent,
          reply: {
            comment_id: data?._id,
            type_id: data?.blog,
            type: "blog",
          },
        });
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setReplies((prev) => [data?.data, ...prev]);
      setReplyContent("");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const getRepliesResult = useInfiniteQuery({
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
    enabled: !!(isOpenReplies && data?.count_reply),
  });
  useEffect(() => {
    const newReplies =
      getRepliesResult.data?.pages?.map((item) => item?.data?.result).flat() ||
      [];
    setReplies(newReplies);
  }, [getRepliesResult.data]);

  return (
    <div className="space-y-6">
      {/* form  */}
      {isOpenForm && (
        <div>
          <form
            onSubmit={onSubmit}
            action=""
            method="post"
            className="flex flex-col gap-2"
          >
            <TextEditor
              type="comment"
              value={replyContent}
              onChange={(e) => setReplyContent(e)}
            />
            <div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      {/* list  */}
      {replies.map((item: any) => (
        <CommentCard key={item._id} data={item} />
      ))}
      {/* button  */}
      {replies.length > 0 && (
        <div className="text-center">
          <button
            className="text-xs text-blue-500"
            onClick={() => {
              getRepliesResult.fetchNextPage();
            }}
            disabled={
              !getRepliesResult.hasNextPage ||
              getRepliesResult.isFetchingNextPage
            }
          >
            {getRepliesResult.isFetchingNextPage
              ? "Loading more..."
              : getRepliesResult.hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(ReplyList);
