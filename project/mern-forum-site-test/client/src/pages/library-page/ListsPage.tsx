import ListItem from "@/components/common/ListItem";
import Paginate from "@/components/form/paginate";
import Loader from "@/components/layout/loader";
import useSearchParamsValue from "@/hook/useSearchParamsValue";
import { useListStore } from "@/store/library-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ListsPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { lists, getListsByMe } = useListStore();
  const getBlogsResult = useQuery({
    queryKey: ["blogs", lists, searchParams.toString()],
    queryFn: () => getListsByMe(searchParams.toString()),
  });

  if (getBlogsResult.isLoading) return <Loader />;

  if (lists.length > 0) {
    return (
      <div className="space-y-5">
        {lists.map((item) => (
          <ListItem key={item._id} data={item} />
        ))}
        <Paginate
          forcePage={Number(getBlogsResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`page`, e.selected + 1)}
          pageCount={getBlogsResult.data?.data?.total_page as number}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">You don't have any listings</div>
        <div>Your listing will appear here.</div>
      </div>
    );
  }
};

export default ListsPage;
