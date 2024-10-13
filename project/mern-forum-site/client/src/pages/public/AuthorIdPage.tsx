import IMAGES_DEFAULT from "@/assets/constants/image";
import BlogCard1 from "@/components/common/blog/BlogCard1";
import ButtonFollowing from "@/components/common/follow/ButtonFollowing";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const AuthorIdPage = () => {
  const { id } = useParams();
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const getAuthorIdResult = useQuery({
    queryKey: ["author", id],
    queryFn: async () => {
      const response = await axiosConfig.get(`/author/get-id/${id}`);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
  const getBlogsByAuthorIdResult = useQuery({
    queryKey: ["blogs", "author", id, searchParams.toString()],
    queryFn: async () => {
      const response = await axiosConfig.get(
        `/blog/get-blogs-by-author-id/${id}?${searchParams.toString()}`
      );
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  const authorData = useMemo(
    () => getAuthorIdResult.data?.data,
    [getAuthorIdResult.data]
  );

  if (getBlogsByAuthorIdResult.isPending || getAuthorIdResult.isPending)
    return <Loader />;

  return (
    <div className="max-w-[800px] w-full mx-auto px-3">
      {/* author  */}
      <div className="relative">
        <div className="rounded-lg overflow-hidden h-[200px]">
          {authorData?.banner ? (
            <img src={authorData?.banner} alt="" loading="lazy" />
          ) : (
            <div className="bg-gray-200 w-full h-full"></div>
          )}
        </div>
        <div className="absolute -bottom-12 left-[50%] -translate-x-[50%] p-1 bg-white rounded-full w-max  mx-auto">
          <div className="w-24 h-24 overflow-hidden rounded-full">
            <img
              src={authorData?.avatar || IMAGES_DEFAULT.account_notfound}
              loading="lazy"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="mt-14 text-center space-y-2 max-w-[460px] w-full mx-auto">
        <div className="text-xl font-medium capitalize">{authorData?.name}</div>
        <div className="text-sm ">{authorData?.bio}</div>
        <div className="text-sm text-text-secondary-color-2 flex items-center justify-center gap-4">
          <span>{authorData?.total_blog} post</span>
          <span>{authorData?.total_follower} follower</span>
          <span>{authorData?.total_following} following</span>
        </div>
        <ButtonFollowing id={id as string} />
      </div>
      {/* blogs  */}
      <div className="mt-10 space-y-4">
        {getBlogsByAuthorIdResult.data?.data?.result?.map((item: any) => {
          return <BlogCard1 key={item._id} data={item} />;
        })}
        <Paginate
          forcePage={Number(getBlogsByAuthorIdResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
          pageCount={getBlogsByAuthorIdResult.data?.data?.total_page as number}
        />
      </div>
    </div>
  );
};

export default AuthorIdPage;
