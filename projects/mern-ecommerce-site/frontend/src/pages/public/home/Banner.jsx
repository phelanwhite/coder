import React, { memo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

const Banner = ({ data }) => {
  return (
    <div className="rounded-lg bg-white py-3 px-4">
      <div>
        <Swiper
          spaceBetween={8}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item?.id}>
              <div className="rounded-lg overflow-hidden">
                <img src={item?.image_url} alt={item?.image_url} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default memo(Banner);
