import React, { memo, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductCard from "features/product/ProductCard";

const HomeProductSlide = ({ data }) => {
  const [indexTab, setIndexTab] = useState(0);
  return (
    <div>
      <div className="rounded-lg bg-white py-3 px-4">
        <div className="font-bold text-base">{data?.title}</div>
        <div className="my-3 overflow-x-auto sticky top-0">
          <div className="flex gap-2">
            {data?.tabs?.map((item, index) => (
              <div
                key={item?.title}
                onClick={() => setIndexTab(index)}
                className={[
                  `py-1 px-4 cursor-pointer rounded-full border min-w-max hover:bg-stone-100`,
                  index === indexTab &&
                    "border-blue-500 text-blue-500 font-bold hover:bg-blue-100",
                ].join(" ")}
              >
                <div>{item?.title}</div>
              </div>
            ))}
          </div>
        </div>
        {/* <ProductSlide data={} /> */}
        <div>
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
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
            navigation
            modules={[Navigation]}
          >
            {data?.tabs?.[indexTab]?.items.map((item) => (
              <SwiperSlide key={item?.seller_product_id || item?.default_spid}>
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default memo(HomeProductSlide);
