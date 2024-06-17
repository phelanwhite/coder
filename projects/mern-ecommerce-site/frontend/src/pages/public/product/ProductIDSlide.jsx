import React, { memo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductCard from "features/product/ProductCard";

const ProductIDSlide = ({ title, items = [] }) => {
  return (
    <div className="">
      <div className="font-bold text-base mb-3">{title}</div>
      <div className="">
        <Swiper
          spaceBetween={8}
          slidesPerView={1}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
          }}
          navigation
          modules={[Navigation]}
        >
          {items?.map((item) => (
            <SwiperSlide key={item?.seller_product_id || item?.default_spid}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default memo(ProductIDSlide);
