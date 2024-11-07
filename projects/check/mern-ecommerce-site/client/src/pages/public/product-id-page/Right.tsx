import ButtonIncrementDecrement from "@/components/form/ButtonIncrementDecrement";
import Loader from "@/components/form/loader";
import { currencyChange } from "@/libs/utils/currency";
import { useCartStore } from "@/stores/cart-store";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Right = ({ data }: { data: any }) => {
  const { createCart } = useCartStore();
  const createCartResult = useMutation({
    mutationFn: async () => {
      return await createCart({
        product: data._id,
        quantity,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice((prev) => quantity * data?.price);
  }, [quantity]);

  if (createCartResult.isPending) return <Loader />;

  return (
    <div className="max-w-[360px] w-full hidden xl:block">
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="overflow-hidden w-10 rounded-md">
            <img
              src="https://salt.tikicdn.com/cache/750x750/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png.webp"
              loading="lazy"
              alt=""
            />
          </div>
          <span>Hong</span>
          <span>128GB</span>
        </div>
        <div className="mt-4 text-base font-medium mb-2">Quantity</div>
        <ButtonIncrementDecrement
          min={1}
          number={quantity}
          // onChangeNumber={(e) => {
          //   // console.log({ e });
          //   // setQuantity(e);
          // }}
        />
        <div className="mt-4 text-base font-medium mb-2">Provisional</div>
        <div className="font-medium text-xl">
          {currencyChange({ value: price })}
        </div>
        <div className="mt-8 flex flex-col gap-1">
          <button className="btn btn-danger w-full">By now</button>
          <button
            onClick={() => createCartResult.mutate()}
            className="btn btn-primary w-full"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Right;
