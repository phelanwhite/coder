import { BlogList1 } from "@/components/common/blog/BlogList";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { getTimeDisplay } from "@/libs/utils/time";
import { useNotificationStore } from "@/stores/notification-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const NotificationPage = () => {
  const { getNotificationsByMe, notifications } = useNotificationStore();
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    _status: `1`,
  });
  const getNotificationsByMeResult = useQuery({
    queryKey: ["me", "notifications", searchParams.toString()],
    queryFn: async () => {
      return await getNotificationsByMe(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <BlogList1
        isLoading={getNotificationsByMeResult.isLoading}
        datas={notifications}
        type="notification"
      />
      {getNotificationsByMeResult.data && notifications?.length > 0 && (
        <div className="mt-4">
          <Paginate
            forcePage={Number(getNotificationsByMeResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={
              getNotificationsByMeResult.data?.data?.total_page as number
            }
          />
        </div>
      )}
    </div>
  );
  return <div>NotificationPage</div>;
};

export default NotificationPage;
