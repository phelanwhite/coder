import { BlogList1 } from "@/components/common/blog/BlogList";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useBlogStore } from "@/stores/blog-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";

const AdminBlogsPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    _status: `1`,
  });
  const { blogs, getBlogsByAdmin } = useBlogStore();
  const getBlogsByAdminResult = useQuery({
    queryKey: ["blogsByAdmin", blogs.length, searchParams.toString()],
    queryFn: async () => {
      return await getBlogsByAdmin(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  return (
    <div>
      <BlogList1
        isLoading={getBlogsByAdminResult.isLoading}
        datas={blogs}
        type="admin"
      />
      {getBlogsByAdminResult.data && blogs?.length > 0 && (
        <div className="mt-4">
          <Paginate
            forcePage={Number(getBlogsByAdminResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getBlogsByAdminResult.data?.data?.total_page as number}
          />
        </div>
      )}
    </div>
  );
};

export default AdminBlogsPage;
