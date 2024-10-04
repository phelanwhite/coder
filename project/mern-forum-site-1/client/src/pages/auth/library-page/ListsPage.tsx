import ListItem from "@/components/commons/list/ListItem";
import Paginate from "@/components/forms/paginate";
import Loader from "@/components/layouts/loader";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useListStore } from "@/stores/library-store";
import { useQuery } from "@tanstack/react-query";

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
