import { memo, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import ReviewForm from "./ReviewForm";

const ReviewCard = () => {
  const [isForm, setIsForm] = useState(false);
  return (
    <div className="py-4 border-t space-y-2">
      <div className="text-secondary-2">Ta Anh Dung</div>
      <div></div>
      <div>
        Giáo hàng đúng hẹn, có gửi tin nhắn OTP trước khi giao hàng, đóng gói
        cẩn thận, hàng mới đẹp, nhân viên giao hàng thân thiện, cám ơn shop, cám
        ơn Tiki
      </div>
      <div className="flex flex-wrap gap-3">
        {Array(10)
          .fill(1)
          .map((item, index) => {
            return (
              <div className="w-20 rounded overflow-hidden" key={index}>
                <img
                  src="https://salt.tikicdn.com/cache/750x750/ts/product/c2/95/b0/405e3bc7267cd545c76fd6eb93fa6045.png.webp"
                  loading="lazy"
                  alt=""
                />
              </div>
            );
          })}
      </div>
      <div className="flex items-center gap-4 text-secondary-2">
        <button className="flex items-center gap-1">
          <AiFillLike /> <span>12</span>
        </button>
        <button
          onClick={() => setIsForm(!isForm)}
          className="flex items-center gap-1"
        >
          <MdComment />
        </button>
      </div>
      {isForm && <ReviewForm />}
    </div>
  );
};

export default memo(ReviewCard);
