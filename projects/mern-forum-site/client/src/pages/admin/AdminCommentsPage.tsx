import CommentItemList from "@/components/common/comment/CommentItemList";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useCommentStore } from "@/stores/comment-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdminCommentsPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { getCommentsByAdmin, comments } = useCommentStore();
  const getCommentByMeResult = useQuery({
    queryKey: ["admin", "comment", searchParams.toString()],
    queryFn: async () => {
      const response = await getCommentsByAdmin(searchParams.toString());
      return response;
    },
  });
  return (
    <div className="px-5 space-y-4">
      <CommentItemList
        datas={comments}
        isLoading={getCommentByMeResult.isLoading}
      />
      {getCommentByMeResult.data && comments?.length > 0 && (
        <div className="mt-4">
          <Paginate
            forcePage={Number(getCommentByMeResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getCommentByMeResult.data?.data?.total_page as number}
          />
        </div>
      )}
    </div>
  );
};

export default AdminCommentsPage;
