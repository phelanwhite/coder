import Loader from "@/components/layout/loader";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useCommentStore } from "@/stores/comment-store";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const MyCommentPage = () => {
  const { handleSearchParams, searchParams } = useSearchParamsValue();
  const { comments, getCommentsByUser, deleteCommentById } = useCommentStore();

  const getDatasByUserResult = useQuery({
    queryKey: ["getCommentsByUser", searchParams.toString()],
    queryFn: () => getCommentsByUser(searchParams.toString()),
  });

  const deleteDataByIdResult = useMutation({
    mutationFn: async (id: string) => deleteCommentById(id),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  if (deleteDataByIdResult.isPending || getDatasByUserResult.isLoading)
    return <Loader />;

  return (
    <div className="space-y-4">
      {comments?.map((item) => {
        return (
          <div
            key={item?.data?._id}
            className="relative bg-gray-100 px-4 py-2 rounded-lg space-y-1"
          >
            <button
              onClick={() => deleteDataByIdResult.mutate(item?.data?._id)}
              className="text-red-500 absolute top-4 right-4"
            >
              <MdDelete />
            </button>
            <div className="text-xs text-gray-500">
              {new Date(item?.data?.createdAt).toDateString()}
            </div>
            <div>
              You commented{" "}
              <Link
                to={`/media/${item?.data?.media_id}?media_type=${item?.data?.media_type}`}
                className="font-medium text-blue-500"
              >
                {item?.getMedia?.title || item?.getMedia?.name}
              </Link>
            </div>
            <div>{item?.data?.comment}</div>
          </div>
        );
      })}
      {comments.length ? (
        <Paginate
          forcePage={Number(getDatasByUserResult.data?.data?._page) - 1}
          onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
          pageCount={getDatasByUserResult.data?.data?.total_page as number}
        />
      ) : (
        <div className="text-center text-gray-500">No comment</div>
      )}
    </div>
  );
};

export default MyCommentPage;
