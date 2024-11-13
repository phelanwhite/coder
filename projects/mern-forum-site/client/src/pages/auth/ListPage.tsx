import ListItemList from "@/components/common/list/ListItemList";
import Loader from "@/components/layout/loader";
import Paginate from "@/components/layout/paginate";
import axiosConfig from "@/configs/axios-config";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useListStore } from "@/stores/list-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const ListPage = () => {
  const { handleSearchParams, searchParams } = useSearchParamsValue();
  const { lists, getListsByMe } = useListStore();
  const getListsByMeResult = useQuery({
    queryKey: ["me", "lists", searchParams.toString()],
    queryFn: async () => {
      return getListsByMe(searchParams.toString());
    },
  });

  return (
    <div className="px-4 space-y-4">
      <div>
        <Link
          to={`/me/new-list`}
          className="btn text-xs btn-success rounded-full"
        >
          New List
        </Link>
      </div>
      <div>
        <ListItemList isLoading={getListsByMeResult.isLoading} datas={lists} />
        {getListsByMeResult.data && lists?.length > 0 && (
          <div className="mt-4">
            <Paginate
              forcePage={Number(getListsByMeResult.data?.data?._page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={getListsByMeResult.data?.data?.total_page as number}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;
