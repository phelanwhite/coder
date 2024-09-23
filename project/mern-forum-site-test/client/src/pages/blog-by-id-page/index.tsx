import { images } from "@/assets/constants";
import BlogActionMenu from "@/components/common/BlogActionMenu";
import ButtonHighlight from "@/components/common/ButtonHighlight";
import CommentCard from "@/components/common/CommentCard";
import CommentListBlog from "@/components/common/CommentListBlog";
import CommentForm from "@/components/form/CommentForm";
import Loader from "@/components/layout/loader";
import axiosConfig from "@/config/axios-config";
import { getDateString } from "@/lib/util/date";
import { useAuthStore } from "@/store/auth-store";
import { useCommentStore } from "@/store/comment-store";
import { useHistoryStore } from "@/store/library-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const BlogByIdPage = () => {
  const { id } = useParams();
  const { user } = useAuthStore();

  // history
  const { createHistory } = useHistoryStore();
  const createHistoryResult = useQuery({
    queryKey: ["history", id],
    queryFn: async () => {
      return await createHistory({ blog: id, type: "blog" });
    },
    enabled: !!user,
  });

  // blog
  const getBlogByIdResult = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const url = `blog/get-id/${id}?user=${user?._id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  const blogData = useMemo(
    () => getBlogByIdResult.data?.data,
    [getBlogByIdResult]
  );

  // like
  const [like, setLike] = useState(0);
  useEffect(() => {
    if (getBlogByIdResult.data?.data?.likes) {
      setLike(getBlogByIdResult.data?.data?.likes);
    }
  }, [getBlogByIdResult.data]);
  const handleLike = async () => {
    const url = `blog/like/${id}`;
    const response = (await axiosConfig.put(url)).data;
    setLike(response.data?.likes);
  };

  // comment
  const { comments, getCommentsByBlogId } = useCommentStore();
  const getCommentsByBlogIdResult = useQuery({
    queryKey: ["comments-by-blog-id", id],
    queryFn: async () => {
      const response = await getCommentsByBlogId(id);
      return response;
    },
    enabled: !!id,
  });

  if (
    getBlogByIdResult.isLoading ||
    getCommentsByBlogIdResult.isLoading ||
    createHistoryResult.isLoading
  )
    return <Loader />;

  return (
    <div className="space-y-6 max-w-[748px] w-full mx-auto px-6">
      <div className="title">{blogData?.title}</div>
      {/* author  */}
      <div className="flex items-start gap-4">
        <Link
          to={`/author-id/${blogData?.author?._id}`}
          className="w-10 h-10 overflow-hidden rounded-full"
        >
          <img
            src={blogData?.author?.avatar || images.account_notfound}
            loading="lazy"
            alt=""
          />
        </Link>
        <div>
          <div className="font-medium text-base">
            <Link
              className="text-link"
              to={`/author-id/${blogData?.author?._id}`}
            >
              {blogData?.author?.name}
            </Link>
          </div>
          <div className="font-medium text-textSecondaryColor flex items-center gap-2 text-xs">
            <span>{blogData?.reading_time_blog} min read</span>
            <span>{getDateString(new Date(blogData?.createdAt))}</span>
          </div>
        </div>
      </div>
      {/* action  */}
      <div className="border-y p-3 flex items-center justify-between text-textSecondaryColor">
        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-textColor"
          >
            <BiSolidLike size={16} />
            <span>{like}</span>
          </button>
          <div className="flex items-center gap-1 hover:text-textColor">
            <FaComment size={16} />
            <span>{blogData?.total_comments}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ButtonHighlight id={id as string} />
          <BlogActionMenu data={blogData} />
        </div>
      </div>
      {blogData?.content && (
        <div className="border-l-blue-400 bg-gray-100 border-l-4 p-4 py-2 italic whitespace-pre-wrap text-base">
          {blogData?.content}
        </div>
      )}
      {/* thumbnail */}
      {blogData?.thumbnail && (
        <div className="max-h-[500px] w-full">
          <img
            src={blogData?.thumbnail || images.thumbnail_notFound}
            loading="lazy"
            alt=""
          />
        </div>
      )}
      {/* description  */}
      <div className="text-base space-y-6">
        <div className="ql-snow">
          <div
            className="ql-editor p-0 leading-8"
            dangerouslySetInnerHTML={{ __html: blogData?.description }}
          ></div>
        </div>
      </div>
      {/* topic */}
      <div className="flex flex-wrap gap-2">
        {blogData?.topic?.map((item: any) => (
          <Link
            key={item}
            to={`/tag?topic=` + item}
            className="btn-secondary text-xs"
          >
            <span>{item}</span>
          </Link>
        ))}
      </div>
      {/* comment  */}
      <CommentForm blogId={id as string} />
      {comments.length > 0 ? (
        <>
          {comments?.map((item: any) => (
            <CommentCard key={item?._id} data={item} />
          ))}
          <div className="text-center">
            <Link to={`comments`} className="text-link">
              view more
            </Link>
          </div>
        </>
      ) : (
        <div>No comment</div>
      )}
    </div>
  );
};

export default BlogByIdPage;
