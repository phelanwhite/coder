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

const ProductSlide: FC<Props> = ({ title, datas }) => {
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
            1024: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 6,
            },
            1456: {
              slidesPerView: 7,
            },
          }}
          navigation={true}
          modules={[Navigation]}
        >
          {datas?.map((item) => (
            <SwiperSlide key={item?._id}>
              <ProductCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlide;
