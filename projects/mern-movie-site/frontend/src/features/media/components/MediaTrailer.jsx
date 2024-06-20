// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { MdClose } from "react-icons/md";
import { memo } from "react";
import { getTmdbUrl } from "services/tmdbApi";
import Loader from "components/ui/loader";

const MediaTrailer = ({ open, close, media_type, media_id }) => {
  const { data: trailerList, ...trailer } = useQuery({
    queryKey: ["modal", media_type, media_id],
    queryFn: async () => {
      const resp = await getTmdbUrl(`${media_type}/${media_id}/videos`);
      return resp;
    },
  });
  if (trailer.isLoading) return <Loader />;
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 h-screen p-10 bg-black/70 z-[100]">
      <button onClick={close} className="absolute top-4 right-4 text-white">
        <MdClose size={20} />
      </button>
      <Swiper
        modules={[Navigation]}
        navigation
        className="h-full w-full"
        slidesPerView={1}
        spaceBetween={0}
      >
        {trailerList?.results?.map((trailer) => (
          <SwiperSlide key={trailer.id}>
            <div className="h-full w-full flex items-center justify-center">
              <iframe
                className="h-full w-full aspect-video"
                src={`https://www.youtube.com/embed/${trailer?.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(MediaTrailer);
