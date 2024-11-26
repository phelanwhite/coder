import PostCard from "@/components/common/post/PostCard";
import PostList from "@/components/common/post/PostList";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { usePostStore } from "@/stores/post-store";
import { useQuery } from "@tanstack/react-query";
import React, { memo } from "react";

const Draft = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    _status: "-1",
  });
  const { posts, getPostByMe } = usePostStore();
  const getDatasResult = useQuery({
    queryKey: [`post`, `me`, searchParams.toString()],
    queryFn: async () => {
      return await getPostByMe(searchParams.toString());
    },
  });
  return (
    <PostList
      menuType="User"
      loading={getDatasResult.isLoading}
      datas={posts}
      onchagePage={(e) => handleSearchParams(`_page`, e.selected + 1)}
      page={getDatasResult?.data?.data?._page}
      pageCount={getDatasResult?.data?.data?.total_pages}
    />
  );
};

export default memo(Draft);
