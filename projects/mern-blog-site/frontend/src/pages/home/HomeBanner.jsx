// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

const HomeBanner = () => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
        }}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        <SwiperSlide>
          <div className="aspect-video">
            <img
              src="https://s3-alpha.figma.com/hub/file/3560211651/resized/800x480/05a9232a-ae22-4f3c-b90a-e847dde20c45-cover.png"
              loading="lazy"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="aspect-video">
            <img
              src="https://s3-alpha.figma.com/hub/file/3560211651/resized/800x480/05a9232a-ae22-4f3c-b90a-e847dde20c45-cover.png"
              loading="lazy"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="aspect-video">
            <img
              src="https://s3-alpha.figma.com/hub/file/3560211651/resized/800x480/05a9232a-ae22-4f3c-b90a-e847dde20c45-cover.png"
              loading="lazy"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;
