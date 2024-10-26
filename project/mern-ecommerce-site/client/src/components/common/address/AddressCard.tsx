import { useAddressStore } from "@/stores/address-store";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../../form/loader";
import { memo } from "react";

const AddressCard = ({ data }: { data: any }) => {
  const { deleteAddressById } = useAddressStore();
  const deleteAddressByIdResult = useMutation({
    mutationFn: async (id) => {
      return await deleteAddressById(id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const handleDelete = () => {
    if (confirm(`Do you really want to delete?`)) {
      deleteAddressByIdResult.mutate(data?._id);
    }
  };

  if (deleteAddressByIdResult.isPending) return <Loader />;

  return (
    <div className="bg-gray-100 p-4 rounded-lg  flex gap-8 items-start">
      <div className="flex-1 flex flex-col gap-1">
        <div className="mb-1 text-secondary-2 font-medium text-base">
          {data?.name}
        </div>
        <div>
          <span className="font-medium text-secondary-2">Address: </span>
          {data?.ward && <span>{data?.ward} Ward, </span>}
          {data?.district && <span>{data?.district} District, </span>}
          {data?.city && <span>{data?.city} City, </span>}
          {data?.country && <span>{data?.country}</span>}
        </div>
        <div>
          <span className="font-medium text-secondary-2">Detail address: </span>
          <span>{data?.address}</span>
        </div>
        <div>
          <span className="font-medium text-secondary-2">Phone: </span>
          <span>{data?.phone} </span>
        </div>
        {data?.isDefault && (
          <div>
            <span className="font-medium text-xs text-green-600">
              Default address
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1">
        <Link className="btn btn-primary btn-sm" to={`edit/${data?._id}`}>
          Edit
        </Link>
        {!data?.isDefault && (
          <button onClick={handleDelete} className="btn btn-danger btn-sm">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(AddressCard);
