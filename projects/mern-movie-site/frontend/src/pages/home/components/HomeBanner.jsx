// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

import { getTmdbImage } from "services/tmdbApi";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Link } from "react-router-dom";
import { memo, useState } from "react";
import { FaPlay } from "react-icons/fa";
import Wrapper from "components/ui/wrapper";
import MediaTrailer from "features/media/components/MediaTrailer";

const HomeBanner = ({ media_list = [] }) => {
  const [mediaTrailer, setMediaTrailer] = useState({
    media_id: "",
    media_type: "",
  });
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const handleOpenTrailer = () => setIsOpenTrailer(true);
  const handleCloseTrailer = () => setIsOpenTrailer(false);
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {media_list.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="min-h-screen text-white flex items-center justify-center"
              style={{
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${getTmdbImage(
                  item.backdrop_path
                )}) no-repeat center/cover`,
              }}
            >
              <Wrapper>
                <div className="w-full lg:max-w-[70%] flex items-start gap-8 pt-20 pb-10">
                  <div className="hidden md:block max-w-[300px] w-full overflow-hidden rounded-lg">
                    <img
                      src={getTmdbImage(item.poster_path)}
                      loading="lazy"
                      alt={item?.name || item?.title}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="text-2xl font-bold">
                      {item?.name || item?.title}
                    </div>
                    <div>
                      <span>Languages: </span>
                      <span>{item?.original_language}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-[50px] h-[50px] overflow-hidden">
                        <CircularProgressbar
                          value={item?.vote_average * 10}
                          text={`${Math.round(
                            Number(item.vote_average) * 10
                          )}%`}
                          styles={buildStyles({
                            textColor: `white`,
                            textSize: `20px`,

                            pathColor: `rgb(22, 163, 74, 1)`,
                            trailColor: `rgba(255, 255, 255, 1)`,
                            pathTransitionDuration: 0.5,
                            pathTransitionTimingFunction: `ease-in-out`,
                          })}
                        />
                      </div>
                      <div>
                        <span>Popularity: </span>
                        {item?.popularity}
                      </div>
                      <div>
                        <span>Vote: </span>
                        {item?.vote_count}
                      </div>
                    </div>
                    <div>{item?.overview}</div>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        to={`/media-id/${item?.id}?media_type=${item?.media_type}`}
                        className="btn btn-danger"
                      >
                        Watch Now
                      </Link>
                      <button
                        onClick={() => {
                          handleOpenTrailer();
                          setMediaTrailer({
                            media_id: item?.id,
                            media_type: item?.media_type,
                          });
                        }}
                        className="btn btn-primary"
                      >
                        <FaPlay />
                        Play Trailer
                      </button>
                    </div>
                  </div>
                </div>
              </Wrapper>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isOpenTrailer && (
        <MediaTrailer
          close={handleCloseTrailer}
          media_id={mediaTrailer.media_id}
          media_type={mediaTrailer.media_type}
        />
      )}
    </div>
  );
};

export default memo(HomeBanner);
