import Loader from "components/Loader";
import PostList from "features/post/PostList";
import {
  usePost_delete_idMutation,
  usePost_get_mypostQuery,
} from "features/post/postApi";
import { useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Link, useSearchParams } from "react-router-dom";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const MyPost = () => {
  const [searchParams] = useSearchParams();
  const postGetAll = usePost_get_mypostQuery({
    params: searchParams.toString(),
  });
  const [postDeleteId, postDeleteIdResult] = usePost_delete_idMutation();

  useEffect(() => {
    if (postDeleteIdResult.isSuccess) {
      toast.success(postDeleteIdResult?.data?.message);
    }
    if (postDeleteIdResult.isError) {
      toast.error(postDeleteIdResult?.error?.data?.message);
    }
  }, [postDeleteIdResult]);

  const columns = useMemo(() => {
    return [
      {
        name: "Name",
        selector: (row) => (
          <Link
            to={`/post-id/${row?._id}`}
            className="font-semibold hover:link"
          >
            {row.name}
          </Link>
        ),
      },
      {
        name: "Thumbnail",
        selector: (row) => (
          <div className="aspect-video w-14">
            <img src={row.thumbnail} alt="" loading="lazy" />
          </div>
        ),
      },
      {
        name: "View",
        selector: (row) => <div>{row?.view}</div>,
      },
      {
        name: "Comment",
        selector: (row) => <div>{row?.comment}</div>,
      },
      {
        name: "Action",
        selector: (row) => (
          <div className="flex items-center gap-2">
            <Link to={`/post-update-id/${row?._id}`} className="text-blue-500">
              <MdEdit size={20} />
            </Link>
            <button
              onClick={() => {
                if (window.confirm(`Delete post?`)) {
                  postDeleteId({ id: row?._id });
                }
              }}
              className="text-red-500"
            >
              <MdDelete size={20} />
            </button>
          </div>
        ),
      },
    ];
  }, [postGetAll]);
  if (postGetAll.isLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link
          to={`/post-create`}
          className="btn btn-success gap-1 px-3 py-2 font-semibold text-xs"
        >
          <MdAdd size={16} />
          Create
        </Link>
      </div>
      <DataTable
        title="My Posts"
        columns={columns}
        data={postGetAll.data}
        customStyles={{
          cells: {
            style: {
              backgroundColor: "transparent",
            },
          },
        }}
      />
    </div>
  );
};

export default MyPost;
