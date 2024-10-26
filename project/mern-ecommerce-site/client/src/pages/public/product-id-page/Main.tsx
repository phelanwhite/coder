import { Rate } from "antd";
import ProductSlide from "./ProductSlide";
import { Link } from "react-router-dom";
import IMAGES_DEFAULT from "@/assets/constants/image";
import { currencyChange } from "@/libs/utils/currency";

const Main = ({
  data,
  similar,
  top_deals,
}: {
  data: any;
  similar: [];
  top_deals: [];
}) => {
  return (
    <div className="w-full space-y-4 overflow-hidden">
      <div className="bg-white rounded-lg p-4 space-y-1">
        <div className="flex items-center gap-3">
          <div className="max-w-24">
            <img src={IMAGES_DEFAULT.policy_icon} loading="lazy" alt="" />
          </div>
          <div className="max-w-24">
            <img src={IMAGES_DEFAULT.authentic_icon} loading="lazy" alt="" />
          </div>
          <div className="text-[13px]">
            <span>Brand: </span>
            <Link to={`/`} className="text-link">
              Apple
            </Link>
          </div>
        </div>
        <div className="text-2xl font-medium">{data?.name}</div>
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
          <span className="text-2xl font-medium">
            {currencyChange({ value: data?.price })}
          </span>
          <span className="inline-block p-0.5 bg-gray-100 text-xs rounded">
            -{data?.discount}%
          </span>
          <span className="line-through text-secondary-2 font-medium">
            {currencyChange({ value: data?.original_price })}
          </span>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 space-y-1 xl:hidden">
        <button className="btn btn-danger w-full">By now</button>
        <button className="btn btn-primary w-full">Add to cart</button>
      </div>
      <ProductSlide title="Similar products" datas={similar} />
      <ProductSlide title="Top Deals" datas={top_deals} />
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
