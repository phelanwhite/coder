import { role_options } from "@/assets/constants/common";
import IMAGES_DEFAULT from "@/assets/constants/image";
import Loader from "@/components/form/loader";
import Paginate from "@/components/form/paginate";
import SelectField from "@/components/form/SelectField";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { getDateTimeString } from "@/libs/utils/date-time";
import { useUserStore } from "@/stores/user-store";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { MdAdd, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();

  const { users, getUsers, deleteUserById, updateUserById } = useUserStore();

  const getDatasResult = useQuery({
    queryKey: ["brands", searchParams.toString()],
    queryFn: async () => {
      return getUsers(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  const deleteDataByIdResult = useMutation({
    mutationFn: async (id: string) => {
      return await deleteUserById(id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const updateDataByIdResult = useMutation({
    mutationFn: async ({ data, id }: { id: string; data: any }) => {
      return await updateUserById(id, data);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const handleDelete = (id: string) => {
    if (confirm(`Do you really want to delete?`)) {
      deleteDataByIdResult.mutate(id);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Avatar",
      selector: (row: any) => (
        <div className="w-10 h-10 overflow-hidden rounded-full border">
          <img
            src={row.avatar || IMAGES_DEFAULT.account_notfound}
            alt=""
            loading="lazy"
          />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: false,
    },
    {
      name: "Joined",
      selector: (row: any) =>
        getDateTimeString({
          date: new Date(row.createdAt),
        }),
      sortable: false,
    },
    {
      name: "Role",
      selector: (row: any) => (
        <SelectField
          className="text-xs"
          value={row.role}
          onChange={(e) =>
            updateDataByIdResult.mutate({
              id: row?._id,
              data: {
                role: e.target.value,
              },
            })
          }
          options={role_options}
        />
      ),
      sortable: false,
    },
    {
      name: "Actions",
      selector: (row: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDelete(row?._id)}
            className="text-red-600 hover:text-red-500 text-xl"
          >
            <MdDelete />
          </button>
        </div>
      ),
      sortable: false,
    },
  ];

  if (
    deleteDataByIdResult.isPending ||
    updateDataByIdResult.isPending ||
    getDatasResult.isLoading
  )
    return <Loader />;

  return (
    <div>
      <div className="flex justify-end gap-4 text-xs">
        <Link className="btn btn-success" to={`create`}>
          <MdAdd />
          <span>Create</span>
        </Link>
      </div>
      <div className="mt-4">
        {users.length > 0 ? (
          <div className="space-y-4">
            <DataTable columns={columns} data={users} />
            <Paginate
              forcePage={Number(getDatasResult.data?.data?._page) - 1}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
              pageCount={getDatasResult.data?.data?.total_page as number}
            />
          </div>
        ) : (
          <div className="text-center text-gray-500">No result found</div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
