import IMAGES_DEFAULT from "@/assets/constants/image";
import { currencyChange } from "@/libs/utils/currency";
import { Rate } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <Link to={`/product-id/1`}>
      <div className="bg-white relative overflow-hidden border rounded-lg hover:shadow group">
        <div className="z-10 group-hover:block hidden">
          <ProductCardOption />
        </div>
        <div className="aspect-square">
          <img
            loading="lazy"
            src="https://salt.tikicdn.com/cache/750x750/ts/product/fa/1d/33/98a0ed962d4b27b6526a93fac7aab192.png.webp"
            alt=""
          />
        </div>
        <div className="p-2 flex flex-col gap-1">
          <div className="line-clamp-2 leading-5 h-10">
            Apple iPhone 13 Apple iPhone 13 Apple iPhone 13 Apple iPhone 13
          </div>
          <div>
            <Rate disabled defaultValue={2} className="text-xs flex gap-0" />
          </div>
          <div className="text-base font-medium text-red-600">
            {currencyChange({ value: 19000000 })}
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-block p-0.5 rounded text-xs font-medium bg-gray-100">
              -48%
            </span>
            <span className="line-through text-xs text-secondary-2">
              {currencyChange({ value: 13000000 })}
            </span>
          </div>
          <div className="text-[10px] text-secondary-2">Made in Singapore</div>
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

export default ProductCard;
