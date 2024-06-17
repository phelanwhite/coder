import React, { memo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import MediaCard from "./MediaCard";
import { Link } from "react-router-dom";

const MediaSlide = ({
  title,
  media_list = [],
  media_type,
  is_view_more = true,
  path_view_more,
}) => {
  return (
    <div>
      <div className="border-red-500 border-l-[4px] pl-4 capitalize text-xl font-semibold mb-4 flex items-center justify-between">
        {title}
        {is_view_more && (
          <Link
            // to={`/view-more?media_type=${media_type}&path_view_more=${path_view_more}`}
            className={"link text-xs"}
          >
            View more
          </Link>
        )}
      </div>
      <Swiper
        spaceBetween={16}
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
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
          1500: {
            slidesPerView: 7,
          },
        }}
      >
        {media_list.map((item) => (
          <SwiperSlide key={item.id}>
            <MediaCard media={item} media_type={media_type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(MediaSlide);
