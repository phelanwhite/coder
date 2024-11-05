// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";

// import Swiper core and required modules
import { Autoplay } from "swiper/modules";

import { memo, useRef, useState } from "react";
import HomePageBannerSlideItem from "./HomePageBannerSlideItem";

const HomePageBannerSlide = ({ data }: { data: any[] }) => {
  const heroSwiperRef = useRef<SwiperRef | null>(null);

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        ref={heroSwiperRef}
      >
        {data.map((item) => (
          <SwiperSlide key={item?.id} itemRef="">
            <HomePageBannerSlideItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default memo(HomePageBannerSlide);
