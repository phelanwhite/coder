import ButtonIncrementDecrement from "components/ButtonIncrementDecrement";
import React, { memo, useState } from "react";
import { getCurrency } from "utils/currency";

const SlidebarRight = ({ data, option }) => {
  const [quantity, setQuantity] = useState(1);
  // // console.log({ option });
  // console.log({ quantity, option });
  return (
    <div className="rounded-lg p-4 bg-white">
      {option && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8">
            <img
              src={option?.thumbnail_url}
              alt={option?.name}
              loading="lazy"
            />
          </div>
          <div>
            {option?.option1} {option?.option2}
          </div>
        </div>
      )}
      <div className="font-semibold mb-3">Số Lượng</div>
      <ButtonIncrementDecrement
        min={1}
        value={quantity}
        setValue={setQuantity}
      />

      <div className="mt-4 font-semibold mb-2">Tạm tính</div>
      <div className="font-semibold text-2xl text-red-500">
        {getCurrency(option?.price * quantity || 0)}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button className="btn btn-danger">Mua ngay</button>
        <button className="btn btn-outline-primary">Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};

export default memo(SlidebarRight);
