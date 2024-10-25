import React, { FC } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/common/product/ProductCard";

interface Props {
  title: string;
  datas: any[];
}

const ProductSlide: FC<Props> = ({ title }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="text-base font-medium mb-4">{title}</div>
      <div>
        <Swiper
          spaceBetween={12}
          slidesPerView={2}
          breakpoints={{
            512: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
          }}
          navigation={true}
          modules={[Navigation]}
        >
          {Array(20)
            .fill(0)
            .map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlide;
