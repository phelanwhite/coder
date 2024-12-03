import ButtonBookmark from "@/components/common/bookmark/ButtonBookmark";
import ButtonFavorite from "@/components/common/favorite/ButtonFavorite";
import ButtonFollow from "@/components/common/follow/ButtonFollow";
import PostButtonMenu from "@/components/common/post/PostButtonMenu";
import PostCard from "@/components/common/post/PostCard";
import ResponseCard from "@/components/common/response/ResponseCard";
import ButtonComponent from "@/components/form/button-component";
import Loader from "@/components/form/loader";
import { axiosConfigV1 } from "@/configs/axios-config";
import { PostType } from "@/constants/type";
import { useAuthStore } from "@/stores/auth-store";
import { useHistoryStore } from "@/stores/history-store";
import { getDateToString } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useMemo } from "react";
import { MdOutlineModeComment } from "react-icons/md";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";

const PostIdPage = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuthStore();
  const { createHistory } = useHistoryStore();
  const getPostByIdResult = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      isLoggedIn &&
        (await createHistory({
          data: id,
          type: "post",
        }));
      const url = `post/get-post-by-id/${id}`;
      const response = (await axiosConfigV1.get(url)).data;
      return response;
    },
    enabled: !!id,
  });
  const getPostByIdSimilarResult = useQuery({
    queryKey: ["post", "similar", id],
    queryFn: async () => {
      const url = `post/get-post-by-id/${id}/similar?_limit=4&_author=${getPostByIdResult.data?.data?.user?._id}`;
      const response = (await axiosConfigV1.get(url)).data;
      return response;
    },
    enabled: !!(id && getPostByIdResult.data),
  });
  const postData = useMemo(() => {
    return getPostByIdResult.data?.data;
  }, [getPostByIdResult.data]);

  return (
    <div>
      {(getPostByIdResult.isLoading || getPostByIdSimilarResult.isLoading) && (
        <Loader />
      )}
      <section className="max-w-screen-md mx-auto space-y-8 px-5">
        {/* title  */}
        <div className="font-bold text-3xl">{postData?.title}</div>
        {/* author  */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center text-sm font-medium ">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={postData?.user?.avatar} loading="lazy" alt="" />
            </div>
            <div>
              <div className="">
                <Link
                  to={`/author/${postData?.user?._id}`}
                  className="hover:underline"
                >
                  {postData?.user?.name}
                </Link>
              </div>
              <div className="mt-1 text-text-secondary-color text-xs flex items-center gap-1">
                <span>11 min read</span>
                <span className="inline-block w-1 h-1 overflow-hidden rounded-full "></span>
                <span>
                  {postData?.createdAt &&
                    getDateToString(
                      new Date(postData?.createdAt).toDateString()
                    )}
                </span>
              </div>
            </div>
          </div>

          <ButtonFollow isFollow={false} follow={postData?.user?._id} />
        </div>
        {/* action  */}
        <div className="p-2 border-y">
          <div className={clsx("flex items-center justify-between")}>
            <div className="text-text-secondary-color text-sm flex items-center gap-3">
              <span className="flex items-center ">
                <ButtonFavorite
                  isFavorite={postData?.isFavorite}
                  total_favorite={postData?.total_favorite}
                  type="post"
                  data={postData?._id}
                />
              </span>
              <span className="flex items-center ">
                <MdOutlineModeComment />
                15
              </span>
            </div>
            {/* action  */}
            <div className="flex items-center gap-3 text-xl">
              <ButtonBookmark
                isBookmark={postData?.isBookmark}
                type="post"
                data={postData?._id}
              />
              <PostButtonMenu menuType="Card" data={postData} />
            </div>
          </div>
        </div>
        {/* content  */}
        {postData?.content && (
          <div className="p-4 border-l-4 border-blue-500 italic bg-gray-100">
            {postData?.content}
          </div>
        )}
        {/* thumbnail */}
        <div>
          <img src={postData?.thumbnail} loading="lazy" alt="" />
        </div>
        {/* description  */}
        <div className="ql-snow">
          <div
            className="ql-editor p-0"
            dangerouslySetInnerHTML={{ __html: postData?.description }}
          ></div>
        </div>
        {/* topics  */}
        <div>
          <ul className="flex flex-wrap items-center gap-2">
            {postData?.topics.map((item: string) => (
              <li key={item}>
                <Link
                  className="inline-block text-xs px-4 py-2 rounded-full overflow-hidden bg-gray-100 hover:bg-gray-200"
                  to={`/topics/${item}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Link article */}
        <div>
          <span>Link article: </span>
          <a
            className="underline text-blue-500 italic"
            href={postData?.article_origin}
          >
            {postData?.article_origin}
          </a>
        </div>
      </section>
      {/* similar */}
      <section className="mt-16 max-w-screen-md mx-auto py-16">
        <div className="px-5 font-semibold text-2xl mb-10">
          More from {postData?.user?.name}
        </div>
        <ul className="grid sm:grid-cols-2 gap-y-12">
          {getPostByIdSimilarResult.data?.data?.results?.map(
            (data: PostType) => (
              <li key={data._id}>
                <PostCard typePost="post3" data={data} menuType="Card" />
              </li>
            )
          ) ?? []}
        </ul>
      </section>
    </div>
  );
};

export default PostIdPage;
