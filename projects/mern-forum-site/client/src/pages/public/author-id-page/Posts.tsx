import PostList from "@/components/common/post/PostList";
import { axiosConfigV1 } from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const Posts = () => {
  const { id } = useParams();
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    _author: id as string,
  });
  const getDatasResult = useQuery({
    queryKey: [`post`, `author`, searchParams.toString()],
    queryFn: async () => {
      const url = `post/get-posts?${searchParams.toString()}`;
      return (await axiosConfigV1.get(url)).data;
    },
  });

  return (
    <PostList
      menuType="User"
      loading={getDatasResult.isLoading}
      datas={getDatasResult?.data?.data?.results}
      onchagePage={(e) => handleSearchParams(`_page`, e.selected + 1)}
      page={getDatasResult?.data?.data?._page}
      pageCount={getDatasResult?.data?.data?.total_pages}
    />
  );
};

export default Posts;
