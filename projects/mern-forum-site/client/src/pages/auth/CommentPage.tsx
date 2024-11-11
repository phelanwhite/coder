import CommentItem from "@/components/common/comment/CommentItem";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { getTimeDisplay } from "@/libs/utils/time";
import { useCommentStore } from "@/stores/comment-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const CommentPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { getCommentsByMe, comments } = useCommentStore();
  const getCommentByMeResult = useQuery({
    queryKey: ["comment", searchParams.toString()],
    queryFn: async () => {
      const response = await getCommentsByMe(searchParams.toString());
      return response;
    },
  });
  return (
    <div className="p-5 space-y-4">
      {/* <BlogList1
        isLoading={getBookmarksByMeResult.isLoading}
        datas={bookmarks}
      /> */}
      {comments.map((item) => {
        return <CommentItem key={item?._id} data={item} />;
      })}
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

export default CommentPage;
