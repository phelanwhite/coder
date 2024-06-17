import React, { memo, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const SlidebarLeft = ({ data }) => {
  const [indexActiveImage, setIndexActiveImage] = useState(0);

  return (
    <div className="rounded-lg p-4 bg-white">
      <div className="border rounded-lg overflow-hidden aspect-square">
        <img
          src={
            indexActiveImage === 0
              ? data?.thumbnail_url
              : data?.images?.[indexActiveImage]?.thumbnail_url
          }
          alt={data?.thumbnail_url}
          loading="lazy"
        />
      </div>
      <div className="mt-2 mb-4">
        <Swiper
          slidesPerView={6}
          spaceBetween={8}
          navigation
          modules={[Navigation]}
        >
          {data?.images?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => setIndexActiveImage(index)}
                className={[
                  `border p-1 rounded overflow-hidden aspect-square cursor-pointer`,
                  index === indexActiveImage && `border-blue-500`,
                ].join(" ")}
              >
                <img
                  src={item?.thumbnail_url}
                  alt={item?.thumbnail_url}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <div className="text-base font-semibold mb-2">
          {data?.highlight?.title}
        </div>
        <div className="flex flex-col gap-1">
          {data?.highlight?.items?.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <div className="w-4 pt-1">
                <img
                  src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                  alt="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(SlidebarLeft);
