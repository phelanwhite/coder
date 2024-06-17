import Loader from "components/Loader";
import CommentForm from "features/comment/CommentForm";
import CommentList from "features/comment/CommentList";
import {
  useComment_createMutation,
  useComment_get_post_idQuery,
} from "features/comment/commentApi";
import { usePost_get_idQuery } from "features/post/postApi";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PostIDPage = () => {
  const { id } = useParams();
  const postGetId = usePost_get_idQuery({ id });
  const commentGetPostId = useComment_get_post_idQuery({ id });
  const [commentCreate, commentCreateResult] = useComment_createMutation();

  const [comment, setComment] = useState("");
  useEffect(() => {
    if (commentCreateResult.isSuccess) {
      toast.success(commentCreateResult?.data?.message);
      setComment("");
    }
    if (commentCreateResult.isError) {
      toast.error(commentCreateResult?.error?.data?.message);
    }
  }, [commentCreateResult]);

  const handleSubmit = (e) => {
    e.preventDefault();
    commentCreate({ body: { comment, post_id: id } });
  };

  if (postGetId.isLoading || commentCreateResult.isLoading) return <Loader />;
  console.log(commentGetPostId);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-secondaryColor">
        <div className="text-xs font-medium mb-2 flex flex-wrap gap-4">
          <span>{new Date(postGetId.data?.updatedAt).toDateString()}</span>
          <span>{postGetId.data?.view} view</span>
          <span>{postGetId.data?.comment} comment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={postGetId.data?.author?.avatar} loading="lazy" alt="" />
          </div>
          <div className="font-semibold">{postGetId.data?.author?.name}</div>
        </div>
      </div>
      <div className="font-bold text-2xl">{postGetId.data?.name}</div>

      <div dangerouslySetInnerHTML={{ __html: postGetId.data?.desc }}></div>

      <div className="flex flex-wrap gap-2">
        {postGetId.data?.tags
          ?.split(",")
          ?.filter((item) => item)
          ?.map((item) => (
            <Link
              key={item}
              to={`/search?tags=${item}`}
              className="px-2 py-0.5 bg-purple-100 text-purple-500 text-xs font-medium rounded-md"
            >
              {item}
            </Link>
          ))}
      </div>

      <div className="flex flex-col gap-8">
        <CommentForm
          comment={comment}
          setComment={setComment}
          handleSubmit={handleSubmit}
        />
        <CommentList data={commentGetPostId.data} />
      </div>
    </div>
  );
};

export default PostIDPage;
