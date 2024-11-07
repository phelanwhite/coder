import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import { BlogCard1 } from "@/components/common/blog/BlogCard";
import { BlogList1 } from "@/components/common/blog/BlogList";
import ButtonFollow from "@/components/common/follow/ButtonFollow";
import Paginate from "@/components/layout/paginate";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

const AuthorIdPage = () => {
  const { id } = useParams();
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const getAuthorIdResult = useQuery({
    queryKey: ["author", id],
    queryFn: async () => {
      const url = `/author/get-id/${id}`;
      const response = await axiosConfig.get(url);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
  const getBlogsByAuthorIdResult = useQuery({
    queryKey: ["blogs", "author", id, searchParams.toString()],
    queryFn: async () => {
      const url = `/blog/get-blogs-by-author-id/${id}?${searchParams.toString()}`;
      const response = await axiosConfig.get(url);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
  const authorData = useMemo(
    () => getAuthorIdResult.data?.data,
    [getAuthorIdResult.data]
  );

  return (
    <div className="max-w-[800px] w-full mx-auto">
      {/* author  */}
      <div className="px-3">
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
          <div className="text-xl font-medium capitalize">
            {authorData?.name}
          </div>
          <div className="text-sm ">{authorData?.bio}</div>
          <div className="text-sm text-text-secondary-color-2 flex items-center justify-center gap-4">
            <span>{authorData?.total_blog} post</span>
            <span>{authorData?.total_follower} follower</span>
            <span>{authorData?.total_following} following</span>
          </div>
          <ButtonFollow data={authorData} />
        </div>
      </div>
      {/* blogs  */}
      <div className="mt-8">
        <BlogList1
          isLoading={getBlogsByAuthorIdResult.isLoading}
          datas={getBlogsByAuthorIdResult.data?.data?.result}
        />
        {getBlogsByAuthorIdResult.data && (
          <div className="mt-4">
            <Paginate
              forcePage={Number(getBlogsByAuthorIdResult.data?.data?._page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={
                getBlogsByAuthorIdResult.data?.data?.total_page as number
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorIdPage;
