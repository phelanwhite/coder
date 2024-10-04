import { images } from "@/assets/constants";
import CommentCard from "@/components/commons/comment/CommentCard";
import CommentForm from "@/components/commons/comment/CommentForm";
import ButtonHighlight from "@/components/commons/highlight/ButtonHighlight";
import Loader from "@/components/layouts/loader";
import axiosConfig from "@/configs/axios-config";
import { getDateString } from "@/libs/utils/date";
import { useAuthStore } from "@/stores/auth-store";
import { useCommentStore } from "@/stores/comment-store";
import { useHistoryStore } from "@/stores/library-store";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FaRegComment } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import BlogByIdMenu from "./BlogByIdMenu";
import ButtonLike from "./ButtonLike";

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
    queryKey: ["blog-id", id],
    queryFn: async () => {
      const url = `blog/get-id/${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  const blogData = useMemo(
    () => getBlogByIdResult.data?.data,
    [getBlogByIdResult]
  );

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
      {/* title  */}
      <div className="title">{blogData?.title}</div>
      {/* author & active  */}
      <div className="flex items-center justify-between gap-4">
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
              <span>
                {blogData?.createdAt &&
                  getDateString(new Date(blogData?.createdAt))}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ButtonHighlight id={id as string} />
          <BlogByIdMenu />
        </div>
      </div>

      {blogData?.content && (
        <div className="border-l-blue-400 bg-gray-100 border-l-4 p-4 py-2 italic whitespace-pre-wrap text-base">
          {blogData?.content}
        </div>
      )}
      {/* thumbnail */}
      {blogData?.thumbnail && (
        <div className="w-full">
          <img
            src={blogData?.thumbnail || images.thumbnail_notFound}
            loading="lazy"
            alt=""
          />
        </div>
      )}
      {/* description  */}
      <div className="text-base space-y-6 overflow-hidden">
        <div className="ql-snow">
          <div
            className="ql-editor p-0 leading-8"
            dangerouslySetInnerHTML={{ __html: blogData?.description }}
          ></div>
        </div>
      </div>
      {/* action  */}
      <div className="flex items-center gap-4 text-base">
        <ButtonLike id={id as string} />
        <div className="flex items-center gap-1 hover:text-textColor">
          <FaRegComment size={16} />
          <span>{blogData?.total_comments}</span>
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
      <div className="space-y-5">
        <div className="text-xl font-bold">
          Comment{" "}
          <span>({getCommentsByBlogIdResult.data?.data?.total_row})</span>
        </div>
        <CommentForm blogId={id as string} />
        {comments.length > 0 ? (
          <>
            {comments?.map((item: any) => (
              <CommentCard key={item?._id} data={item} />
            ))}
            {getCommentsByBlogIdResult.data?.data?.total_page > 1 && (
              <div className="text-center">
                <Link to={`comments`} className="text-link">
                  view more
                </Link>
              </div>
            )}
          </>
        ) : (
          <div>No comment</div>
        )}
      </div>
    </div>
  );
};

export default BlogByIdPage;
