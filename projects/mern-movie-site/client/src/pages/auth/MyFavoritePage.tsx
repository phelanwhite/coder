import Loader from "@/components/layout/loader";
import Paginate from "@/components/layout/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { getTmdbImage } from "@/services/tmdb-servies";
import { useFavoriteStore } from "@/stores/favorite-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const MyFavoritePage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();

  const { favories, getFavoritesByUser, deleteFavoriteById } =
    useFavoriteStore();

  const getDatasByUserResult = useQuery({
    queryKey: ["getFavoritesByUser", searchParams.toString()],
    queryFn: () => getFavoritesByUser(searchParams.toString()),
  });

  const deleteDataByIdResult = useMutation({
    mutationFn: async (id: string) => deleteFavoriteById(id),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const columns = [
    {
      name: "Stt",
      selector: (row: any, index: number) => index + 1,
      width: `100px`,
    },
    {
      name: "Title/Name",
      selector: (row: any) => (
        <div className="font-semibold">
          {row?.media_type === `person` ? (
            <Link to={`/person/${row?.data?.id}`}>
              {row.data?.title || row.data?.name}
            </Link>
          ) : row?.media_type === `collection` ? (
            <Link to={`/collection/${row?.data?.id}`}>
              {row.data?.title || row.data?.name}
            </Link>
          ) : (
            <Link to={`/media/${row?.data?.id}?media_type=${row?.media_type}`}>
              {row.data?.title || row.data?.name}
            </Link>
          )}
        </div>
      ),
    },
    {
      name: "Thumbnail/Avatar",
      selector: (row: any) => (
        <div className="w-10 py-1">
          <img
            src={getTmdbImage(
              row?.data?.poster_path || row?.data?.profile_path
            )}
            loading="lazy"
            alt=""
          />
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row: any) => (
        <div className="capitalize">{row?.media_type}</div>
      ),
    },
    {
      name: "Genres/Department",
      selector: (row: any) =>
        row?.data?.known_for_department
          ? row?.data?.known_for_department
          : row?.data?.genres?.map((item: any) => item?.name)?.join(", "),
    },
    {
      name: "Release date/Birthday",
      selector: (row: any) =>
        (row?.data?.release_date ||
          row?.data?.first_air_date ||
          row?.data?.birthday) &&
        new Date(
          row?.data?.release_date ||
            row?.data?.first_air_date ||
            row?.data?.birthday
        ).getFullYear(),
    },
    {
      name: "Action",
      selector: (row: any) => (
        <button
          onClick={() => deleteDataByIdResult.mutate(row?._id)}
          className="btn btn-danger"
        >
          <MdDelete size={20} className="text-red-600 hover:text-red-500" />
        </button>
      ),
    },
  ] as any;

  if (getDatasByUserResult.isLoading || deleteDataByIdResult.isPending)
    return <Loader />;
  return (
    <div>
      <div className="wrapper my-10 space-y-4">
        <DataTable columns={columns} data={favories} />
        {favories?.length ? (
          <Paginate
            forcePage={Number(getDatasByUserResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getDatasByUserResult.data?.data?.total_page as number}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyFavoritePage;
