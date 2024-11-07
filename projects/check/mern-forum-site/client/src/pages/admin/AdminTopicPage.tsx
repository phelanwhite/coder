import FavoriteItem from "@/components/common/favorite/FavoriteItem";
import Loader from "@/components/common/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useFavoriteStore } from "@/stores/favorite-store";
import { useTopicStore } from "@/stores/topic-store";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminTopicPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { topics, getTopics, deleteTopicById } = useTopicStore();
  const getTopicsByMeResult = useQuery({
    queryKey: ["topic", "me", topics.length, searchParams.toString()],
    queryFn: async () => {
      return await getTopics(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  const deleteTopicByIdResult = useMutation({
    mutationFn: async (id: string) => {
      return await deleteTopicById(id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete")) {
      deleteTopicByIdResult.mutate(id);
    }
  };

  if (getTopicsByMeResult.isPending) return <Loader />;

  if (topics.length > 0) {
    return (
      <div className="space-y-4">
        {topics.map((item) => {
          return (
            <div className="shadow rounded px-4 py-2 flex items-center justify-between">
              <Link to={`/topic/${item?.title}`} className="capitalize">
                {item?.title}
              </Link>
              <button onClick={() => handleDelete(item?._id)}>
                <MdDelete className="text-red-500" />
              </button>
            </div>
          );
        })}
        <Paginate
          forcePage={Number(getTopicsByMeResult.data?.data?.page) - 1}
          onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
          pageCount={getTopicsByMeResult.data?.data?.total_page as number}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="font-semibold">You have no topic.</div>
      </div>
    );
  }
};

export default AdminTopicPage;
