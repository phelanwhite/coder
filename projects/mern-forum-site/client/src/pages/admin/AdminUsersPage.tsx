import UserItemList from "@/components/common/user/UserItemList";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useUserStore } from "@/stores/user-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdminUsersPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { getUsersByAdmin, users } = useUserStore();
  const getCommentByMeResult = useQuery({
    queryKey: ["comment", searchParams.toString()],
    queryFn: async () => {
      const response = await getUsersByAdmin(searchParams.toString());
      return response;
    },
  });
  return (
    <div className="px-5 space-y-4">
      <UserItemList datas={users} isLoading={getCommentByMeResult.isLoading} />
      {getCommentByMeResult.data && users?.length > 0 && (
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

export default AdminUsersPage;
