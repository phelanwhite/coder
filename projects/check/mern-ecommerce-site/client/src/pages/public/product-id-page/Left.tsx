// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const Left = ({ data }: { data: any }) => {
  return (
    <div className="md:max-w-[320px] lg:max-w-[400px] w-full">
      <div className="bg-white rounded-lg p-4 space-y-4">
        <div className="border rounded-lg overflow-hidden aspect-square">
          <img src={data?.thumbnail} loading="lazy" alt="" />
        </div>
        <div>
          <Swiper
            spaceBetween={8}
            slidesPerView={6}
            navigation={true}
            modules={[Navigation]}
          >
            {data?.images?.map((item: any) => (
              <SwiperSlide key={item}>
                <div className="p-0.5 border rounded-lg cursor-pointer">
                  <img loading="lazy" src={item} alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {data?.highlight?.length > 0 && (
          <div>
            <div className="font-medium text-base mb-3">
              Outstanding features
            </div>
            <div>
              <ul className="space-y-2">
                {data?.highlight?.map((item: any, index: any) => {
                  return (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-4 pt-0.5">
                        <img
                          src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                          loading="lazy"
                          alt=""
                        />
                      </div>
                      <div className="flex-1">{item}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Left;
