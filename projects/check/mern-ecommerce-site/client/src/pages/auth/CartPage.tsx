import ButtonIncrementDecrement from "@/components/form/ButtonIncrementDecrement";
import Loader from "@/components/form/loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { currencyChange } from "@/libs/utils/currency";
import { useCartStore } from "@/stores/cart-store";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const CartPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();

  const { carts, getCarts, deleteCartById, updateCartById } = useCartStore();

  const getDatasResult = useQuery({
    queryKey: ["carts", searchParams.toString()],
    queryFn: async () => {
      return getCarts(searchParams.toString());
    },
    placeholderData: keepPreviousData,
  });
  const deleteDataByIdResult = useMutation({
    mutationFn: async (id: string) => {
      return await deleteCartById(id);
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

  if (deleteDataByIdResult.isPending || getDatasResult.isLoading)
    return <Loader />;

  return (
    <div className=" overflow-x-auto">
      {carts.length > 0 ? (
        <div className="space-y-4 w-full text-left">
          <div className="text-secondary-2 rounded-lg bg-white p-4">
            <div className="flex gap-8 items-center">
              <div className="w-full min-w-[300px]">All (10 product)</div>
              <div className="w-[180px]">Unit price</div>
              <div className="w-[120px]">Quantity</div>
              <div className="w-[180px]">Total amount</div>
              <div className="w-[20px]">
                <MdDelete size={20} />
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 space-y-4">
            {carts?.map((item, index) => {
              return (
                <div key={index} className="flex gap-8 items-center">
                  <div className="w-full min-w-[300px] flex items-center gap-4">
                    <input type="checkbox" />
                    <div className="w-16">
                      <img
                        src={item?.product?.thumbnail}
                        alt={item?.product?.name}
                      />
                    </div>
                    <div className="w-full">{item?.product?.name}</div>
                  </div>
                  <div className="w-[180px]">
                    <div className="font-medium text-red-500">
                      {currencyChange({ value: item?.product?.price })}
                    </div>
                    <div className="text-secondary-2 line-through text-xs">
                      {currencyChange({
                        value: item?.product?.original_price,
                      })}
                    </div>
                  </div>
                  <div className="w-[200px]">
                    <ButtonIncrementDecrement
                      size="sm"
                      min={1}
                      number={item?.quantity}
                      onChangeNumber={(e) =>
                        // updateCartById(item?._id, {
                        //   quantity: e,
                        // })
                        {
                          console.log({ e });
                        }
                      }
                    />
                  </div>
                  <div className="w-[180px] text-red-500 font-medium">
                    {currencyChange({
                      value: item?.quantity * item?.product?.price,
                    })}
                  </div>
                  <div className="w-[20px]">
                    <button onClick={() => handleDelete(item?._id)}>
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-secondary-2 rounded-lg bg-white p-4">
            Total amount:
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No result found</div>
      )}
    </div>
  );
};

export default CartPage;
