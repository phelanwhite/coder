import HighlightItem from "@/components/commons/highlight/HighlightItem";
import Paginate from "@/components/forms/paginate";
import Loader from "@/components/layouts/loader";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useHighlightStore } from "@/stores/library-store";
import { useQuery } from "@tanstack/react-query";

const HighlightsPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { highlights, getHighlightsByMe } = useHighlightStore();
  const getBlogsResult = useQuery({
    queryKey: ["highlights", searchParams.toString()],
    queryFn: () => getHighlightsByMe(searchParams.toString()),
  });

  if (getBlogsResult.isLoading) return <Loader />;

  if (highlights?.length > 0) {
    return (
      <div className="space-y-5">
        {highlights?.map((item) => (
          <HighlightItem key={item._id} data={item} />
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
        <div className="font-semibold">No highlights</div>
      </div>
    );
  }
};

export default HighlightsPage;
