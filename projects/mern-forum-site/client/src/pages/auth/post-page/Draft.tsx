import MyQueriesResultList from "@/components/common/MyQueriesResultList";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { usePostStore } from "@/stores/post-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { memo, useMemo } from "react";

const Draft = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    _status: "-1",
  });
  const { posts, getPostByMe } = usePostStore();
  const getDatasResult = useQuery({
    queryKey: [`me`, `draft`, searchParams.toString()],
    queryFn: async () => {
      return await getPostByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  const makeData = useMemo(() => {
    return posts.map((item) => ({
      ...item,
      type: `post`,
      data: item,
    }));
  }, [posts]);

  return (
    <MyQueriesResultList
      menuType="Author"
      loading={getDatasResult.isLoading}
      datas={makeData}
      onchagePage={(e) => handleSearchParams(`_page`, e.selected + 1)}
      page={getDatasResult?.data?.data?._page}
      pageCount={getDatasResult?.data?.data?.total_pages}
    />
  );
};

export default memo(Draft);
