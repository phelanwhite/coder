import { Rate } from "antd";
import ProductSlide from "./ProductSlide";
import { Link } from "react-router-dom";
import IMAGES_DEFAULT from "@/assets/constants/image";
import { currencyChange } from "@/libs/utils/currency";
import toast from "react-hot-toast";
import { useCartStore } from "@/stores/cart-store";
import { useMutation } from "@tanstack/react-query";
import Loader from "@/components/form/loader";

const Main = ({
  data,
  similar,
  top_deals,
}: {
  data: any;
  similar: [];
  top_deals: [];
}) => {
  const { createCart } = useCartStore();
  const createCartResult = useMutation({
    mutationFn: async () => {
      return await createCart({
        product: data._id,
        quantity: 1,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (createCartResult.isPending) return <Loader />;

  return (
    <div className="w-full space-y-4 overflow-hidden">
      {/* top  */}
      <div className="bg-white rounded-lg p-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <div className="max-w-24">
              <img src={IMAGES_DEFAULT.policy_icon} loading="lazy" alt="" />
            </div>
            <div className="max-w-24">
              <img src={IMAGES_DEFAULT.authentic_icon} loading="lazy" alt="" />
            </div>
            <div className="text-[13px]">
              <span>Brand: </span>
              <Link to={`/brand/${data?.brand?._id}`} className="text-link">
                {data?.brand?.name}
              </Link>
            </div>
          </div>
          <div className="text-xl font-medium">{data?.name}</div>
          <div className="flex items-center gap-2">
            <span>{data?.rating_average}</span>
            <Rate
              disabled
              defaultValue={data?.rating_average}
              className="text-xs flex gap-0"
            />
            <span className="text-secondary-2">(1999)</span>
            <span className="border-l pl-2 text-secondary-2">
              Sold {data?.quantity_sold}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-medium text-red-500">
              {currencyChange({ value: data?.price })}
            </span>
            <span className="inline-block p-0.5 bg-gray-100 text-xs rounded">
              -{data?.discount}%
            </span>
            <span className="line-through text-secondary-2">
              {currencyChange({ value: data?.original_price })}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-base font-medium mb-4">Options</div>
          <div className="flex gap-4 flex-wrap">
            <button className="btn px-2 font-medium">
              <div className="w-6">
                <img
                  src={`https://salt.tikicdn.com/cache/750x750/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png.webp`}
                  alt=""
                />
              </div>
              <span>Hong</span>
              <span>128GB</span>
            </button>
            <button className="btn px-2 font-medium">
              <div className="w-6">
                <img
                  src={`https://salt.tikicdn.com/cache/750x750/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png.webp`}
                  alt=""
                />
              </div>
              <span>Hong</span>
              <span>128GB</span>
            </button>
            <button className="btn px-2 font-medium">
              <div className="w-6">
                <img
                  src={`https://salt.tikicdn.com/cache/750x750/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png.webp`}
                  alt=""
                />
              </div>
              <span>Hong</span>
              <span>128GB</span>
            </button>
            <button className="btn px-2 font-medium">
              <div className="w-6">
                <img
                  src={`https://salt.tikicdn.com/cache/750x750/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png.webp`}
                  alt=""
                />
              </div>
              <span>Hong</span>
              <span>128GB</span>
            </button>
          </div>
        </div>
      </div>
      {/* By now */}
      <div className="bg-white rounded-lg p-4 space-y-1 xl:hidden">
        <button className="btn btn-danger w-full">By now</button>
        <button
          onClick={() => createCartResult.mutate()}
          className="btn btn-primary w-full"
        >
          Add to cart
        </button>
      </div>
      {/* similar */}
      <ProductSlide title="Similar products" datas={similar} />
      {/* top_deals */}
      <ProductSlide title="Top Deals" datas={top_deals} />
      {/* Warranty information */}
      <div className="bg-white rounded-lg p-4">
        <div className="text-base font-medium mb-4">Warranty information</div>
        <div>
          <ul>
            <li className="border-b py-2 last:border-none first:pt-0">
              <span className="text-secondary-1">Thời gian bảo hành:</span>{" "}
              <span>12 Tháng</span>
            </li>
            <li className="border-b py-2 last:border-none first:pt-0">
              <span className="text-secondary-1">Hình thức bảo hành:</span>{" "}
              <span>Hóa đơn</span>
            </li>
            <li className="border-b py-2 last:border-none first:pt-0">
              <span className="text-secondary-1">Nơi bảo hành:</span>{" "}
              <span>Bảo hành chính hãng</span>
            </li>
            <li className="border-b py-2 last:border-none first:pt-0">
              <span className="text-secondary-1">Hướng dẫn bảo hành:</span>{" "}
              <span>Xem chi tiết</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Shop with confidence */}
      <div className="bg-white rounded-lg p-4">
        <div className="text-base font-medium mb-4">Shop with confidence</div>
        <div>
          <ul>
            <li className="border-b py-2 last:border-none first:pt-0">
              Được đồng kiểm khi nhận hàng
            </li>
            <li className="border-b py-2 last:border-none first:pt-0">
              Được hoàn tiền 200% nếu là hàng giả.
            </li>
            <li className="border-b py-2 last:border-none first:pt-0">
              Đổi trả miễn phí trong 30 ngày. Được đổi ý. Chi tiết
            </li>
          </ul>
        </div>
      </div>
      {/* Detailed information */}
      <div className="bg-white rounded-lg p-4">
        <div className="text-base font-medium mb-4">Detailed information</div>
        <div>
          <ul>
            <li className="border-b py-2 last:border-none first:pt-0 flex gap-2 items-center">
              <div className="flex-1 text-secondary-2">Hình thức bảo hành</div>
              <div className="flex-1">Hóa đơn</div>
            </li>
            <li className="border-b py-2 last:border-none first:pt-0 flex gap-2 items-center">
              <div className="flex-1 text-secondary-2">Dung lượng pin</div>
              <div className="flex-1">3240 mAh</div>
            </li>
            <li className="border-b py-2 last:border-none first:pt-0 flex gap-2 items-center">
              <div className="flex-1 text-secondary-2">Bluetooth</div>
              <div className="flex-1">v5., A2DP, LE</div>
            </li>
            <li className="border-b py-2 last:border-none first:pt-0 flex gap-2 items-center">
              <div className="flex-1 text-secondary-2">Hình thức bảo hành</div>
              <div className="flex-1">Hóa đơn</div>
            </li>
          </ul>
        </div>
      </div>
      {/* description  */}
      <div className="bg-white rounded-lg p-4">
        <div className="text-base font-medium mb-4">Product description</div>
        <div className="space-y-6 overflow-hidden">
          <div className="ql-snow">
            <div
              className="ql-editor p-0 leading-8"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
          </div>
        </div>
        {/* <div>
          <div>
            iPhone 13. Hệ thống camera kép tiên tiến nhất từng có trên iPhone.
            Chip A15 Bionic thần tốc. Bước nhảy vọt về thời lượng pin. Thiết kế
            bền bỉ. Mạng 5G siêu nhanh.1 Cùng với màn hình Super Retina XDR sáng
            hơn.
          </div>
          <div>
            Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh
            đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể
            phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng
            kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị
            trên 1 triệu đồng).....
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Main;
