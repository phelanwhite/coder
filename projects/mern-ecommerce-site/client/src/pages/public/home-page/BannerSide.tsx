import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const BannerSide = () => {
  return (
    <div className="bg-white rounded-lg p-4">
      <Swiper
        spaceBetween={12}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {Array(10)
          .fill(0)
          .map((item, index) => (
            <SwiperSlide key={index}>
              <div className="overflow-hidden rounded-lg aspect-video">
                <img
                  src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/91/e0/2c/2e478a6536cacd014b0796093d7cc9ee.png.webp"
                  alt="Product"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default BannerSide;
