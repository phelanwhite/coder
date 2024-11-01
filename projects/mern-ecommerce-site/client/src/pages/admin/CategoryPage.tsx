import Loader from "@/components/form/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useCategoryStore } from "@/stores/category-store";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();

  const { categories, getCategories, deleteCategoryById } = useCategoryStore();

  const getDatasResult = useQuery({
    queryKey: ["categories", searchParams.toString()],
    queryFn: async () => {
      return getCategories(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  const deleteDataByIdResult = useMutation({
    mutationFn: async (id: string) => {
      return await deleteCategoryById(id);
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
      name: "Thumbnail",
      selector: (row: any) => (
        <div className="w-10">
          <img src={row.thumbnail} alt="" loading="lazy" />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Actions",
      selector: (row: any) => (
        <div className="flex items-center gap-2">
          <Link
            className="text-blue-600 hover:text-blue-500 text-xl"
            to={`update-id/${row?._id}`}
          >
            <MdEdit />
          </Link>
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

  if (deleteDataByIdResult.isPending || getDatasResult.isLoading)
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
        {categories.length > 0 ? (
          <div className="space-y-4">
            <DataTable columns={columns} data={categories} />
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

export default CategoryPage;
