import AddressCard from "@/components/common/address/AddressCard";
import Loader from "@/components/form/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useAddressStore } from "@/stores/address-store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const AddressBookPage = () => {
  const { handleSearchParams, searchParams } = useSearchParamsValue();
  const { address, getAddress } = useAddressStore();
  const getAddressResult = useQuery({
    queryKey: ["address", searchParams.toString()],
    queryFn: async () => {
      const response = await getAddress(searchParams.toString());
      return response;
    },
    placeholderData: keepPreviousData,
  });

  if (getAddressResult.isPending) return <Loader />;

  return (
    <div className="space-y-4">
      <Link className="btn w-full text-blue-600" to={`add`}>
        <MdAdd />
        <span>Add Address</span>
      </Link>
      {address.length > 0 ? (
        <>
          {address?.map((item) => (
            <AddressCard key={item?._id} data={item} />
          ))}
          <Paginate
            forcePage={Number(getAddressResult.data?.data?._page) - 1}
            onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            pageCount={getAddressResult.data?.data?.total_page as number}
          />
        </>
      ) : (
        <div className="text-center text-gray-500">No result found</div>
      )}
    </div>
  );
};

export default AddressBookPage;
