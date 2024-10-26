import IMAGES_DEFAULT from "@/assets/constants/image";
import { currencyChange } from "@/libs/utils/currency";
import { Rate } from "antd";
import { memo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProductCard = ({ data }: { data: any }) => {
  return (
    <Link to={`/product-id/${data?._id}`}>
      <div className="bg-white relative overflow-hidden border rounded-lg hover:shadow group">
        <div className="z-10 group-hover:block hidden">
          <ProductCardOption />
        </div>
        <div className="aspect-square">
          <img loading="lazy" src={data?.thumbnail} alt="" />
        </div>
        <div className="p-2 flex flex-col gap-1">
          <div className="line-clamp-2 leading-5 h-10">{data?.name}</div>
          <div>
            <Rate
              disabled
              defaultValue={data?.rating_average}
              className="text-xs flex gap-0"
            />
          </div>
          <div className="text-base font-medium text-red-600">
            {currencyChange({ value: data?.price })}
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-block p-0.5 rounded text-xs font-medium bg-gray-100">
              -{data?.discount}%
            </span>
            <span className="line-through text-xs text-secondary-2">
              {currencyChange({ value: data?.original_price })}
            </span>
          </div>
          <div className="text-[10px] text-secondary-2 min-h-4">
            {data?.imported && `Made in ${data?.imported}`}
          </div>
          <div className="border-t pt-1 text-[10px] text-secondary-2 font-medium flex items-center gap-2">
            <div className="w-7">
              <img src={IMAGES_DEFAULT.now_icon} loading="lazy" alt="" />
            </div>
            <span>Giao siêu tốc</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductCardOption = () => {
  return (
    <div className="absolute top-1.5 right-1.5 border flex flex-col items-center gap-3 overflow-hidden rounded-md  bg-white shadow p-1.5">
      <button>
        {/* <IoBookmark size={16}/> */}
        <IoBookmarkOutline size={16} />
      </button>
      <button>
        {/* <FaHeart /> */}
        <FaRegHeart />
      </button>
    </div>
  );
};

export default memo(ProductCard);
