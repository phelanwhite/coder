// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const Left = () => {
  return (
    <div className="md:max-w-[320px] lg:max-w-[400px] w-full">
      <div className="bg-white rounded-lg p-4">
        <div className="border rounded-lg overflow-hidden aspect-square">
          <img
            src="https://salt.tikicdn.com/cache/750x750/ts/product/a2/38/6c/ce008c63f4ac771550439da44f5f8ee8.png.webp"
            loading="lazy"
            alt=""
          />
        </div>
        <div className="my-4">
          <Swiper
            spaceBetween={8}
            slidesPerView={6}
            navigation={true}
            modules={[Navigation]}
          >
            {Array(20)
              .fill(0)
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="p-0.5 border rounded-lg cursor-pointer">
                    <img
                      loading="lazy"
                      src="https://salt.tikicdn.com/cache/100x100/ts/product/57/02/a3/827d061b7f9437c03561e2c810bfed27.jpg.webp"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div>
          <div className="font-medium text-base mb-3">Outstanding features</div>
          <div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-4 pt-0.5">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  6.1-inch Super Retina XDR display with Cinema mode, which
                  creates shallow depth of field and automatically changes focus
                  in video.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-4 pt-0.5">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  6.1-inch Super Retina XDR display with Cinema mode, which
                  creates shallow depth of field and automatically changes focus
                  in video.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-4 pt-0.5">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  6.1-inch Super Retina XDR display with Cinema mode, which
                  creates shallow depth of field and automatically changes focus
                  in video.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
