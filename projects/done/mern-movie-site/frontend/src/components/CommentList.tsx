import { useSelector } from "react-redux";
import {
  useGetCommentQuery,
  useRemoveCommentMutation,
} from "../stores/commentApi";
import CommentForm from "./CommentForm";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { commentsMediaIdApi, getTmdbImage } from "../services/tmdb";
import { memo, useMemo } from "react";
import Loader from "./loader";

const CommentList = ({ id, type }: { id: string; type: string }) => {
  const user = useSelector((state: any) => state?.authSlice?.currentUser);
  const getComment = useGetCommentQuery(`id=${id}&type=${type}`);
  const [removeComment] = useRemoveCommentMutation();
  const getCommentTMDBApi = useQuery({
    queryKey: [`commentList`, id, type],
    queryFn: async () => {
      const response = await commentsMediaIdApi({
        id,
        media_type: type,
      });
      return response;
    },
  });

  const commentData = useMemo(() => {
    const convertReview = getCommentTMDBApi.data?.results?.map((item: any) => ({
      _id: item?.id,
      user: {
        avatar: getTmdbImage(item?.author_details?.avatar_path),
        name: item?.author,
      },
      comment: item?.content,
      updatedAt: item?.created_at,
    }));
    return getComment.data
      ? getComment.data?.concat(convertReview)
      : convertReview
      ? convertReview
      : [];
  }, [getComment.data, getCommentTMDBApi.data]);
  if (getComment.isLoading || getCommentTMDBApi.isLoading) return <Loader />;

  return (
    <div>
      <div className="capitalize text-xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
        Comment
      </div>
      <CommentForm id={id} type={type} />
      {commentData?.map((comment: any) => (
        <div key={comment._id} className="mt-4 flex items-start gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={comment?.user?.avatar} alt="" loading="lazy" />
          </div>
          <div className="bg-stone-100 flex-1 px-3 py-2 rounded-md">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{comment?.user?.name}</span>

              {user && user?._id === comment?.user?._id && (
                <button onClick={() => removeComment(comment?._id)}>
                  <MdDelete className="text-red-500" />
                </button>
              )}
            </div>
            <div className="text-xs text-gray-500 italic mb-1">
              {new Date(comment?.updatedAt).toDateString()}
            </div>
            <div dangerouslySetInnerHTML={{ __html: comment?.comment }}></div>
          </div>
        </div>
      )) || <div>No comment yet.</div>}
    </div>
  );
};

export default memo(CommentList);
