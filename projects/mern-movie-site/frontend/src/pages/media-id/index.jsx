import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FaHeart, FaPlay } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import Loader from "components/ui/loader";
import { toast } from "react-toastify";
import { getTmdbImage, getTmdbUrl } from "services/tmdbApi";
import Wrapper from "components/ui/wrapper";
import MediaSlide from "features/media/components/MediaSlide";
import MediaTrailer from "features/media/components/MediaTrailer";
import CharacterCard from "./components/CharacterCard";
import { useAddMovieMutation } from "features/my-movie/services/myMovieApi";
import ReviewList from "features/review/components/ReviewList";

const MediaId = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [addMovie, addMovieResult] = useAddMovieMutation();

  useEffect(() => {
    if (addMovieResult.isSuccess) {
      toast.success(addMovieResult.data?.message);
    }
    if (addMovieResult.isError) {
      toast.error(addMovieResult.error.data?.message);
    }
  }, [addMovieResult]);

  const media_id = useQuery({
    queryKey: [`media_id`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await getTmdbUrl(
        `${searchParams.get("media_type")}/${id}`
      );
      return response;
    },
  });
  const mediaData = useMemo(() => media_id.data, [media_id]);

  const credits = useQuery({
    queryKey: [`credits`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await getTmdbUrl(
        `${searchParams.get("media_type")}/${id}/credits`
      );
      return response;
    },
  });
  const cast = useMemo(() => credits.data?.cast, [credits]);

  const recommendations = useQuery({
    queryKey: [`recommendations`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await getTmdbUrl(
        `${searchParams.get("media_type")}/${id}/recommendations`
      );
      return response;
    },
  });

  const similar = useQuery({
    queryKey: [`similar`, id, searchParams.get(`media_type`)],
    queryFn: async () => {
      const response = await getTmdbUrl(
        `${searchParams.get("media_type")}/${id}/similar`
      );
      return response;
    },
  });

  const [mediaTrailer, setMediaTrailer] = useState({
    media_id: "",
    media_type: "",
  });
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const handleOpenTrailer = () => setIsOpenTrailer(true);
  const handleCloseTrailer = () => setIsOpenTrailer(false);

  if (credits.isLoading || media_id.isLoading || recommendations.isLoading)
    return <Loader />;

  return (
    <div>
      <div
        className="min-h-screen text-white flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${getTmdbImage(
                  mediaData?.backdrop_path
                )}) no-repeat center/cover`,
        }}
      >
        <Wrapper>
          <div className="w-full lg:max-w-[80%] flex md:items-start flex-col md:flex-row gap-8 pt-20 pb-10">
            <div className="mx-auto md:max-w-[300px] lg:max-w-[400px] w-full overflow-hidden rounded-lg">
              <img
                src={getTmdbImage(mediaData?.poster_path)}
                loading="lazy"
                alt={mediaData?.name || mediaData?.title}
              />
            </div>
            <div className="flex-1 overflow-hidden flex flex-col gap-6">
              <div className="text-3xl font-bold">
                {mediaData?.name || mediaData?.title}
              </div>
              <div>
                <span>Release date: </span>
                <span>{mediaData?.release_date}</span>
              </div>
              <div>
                <span>Languages: </span>
                <span>
                  {mediaData?.spoken_languages
                    ?.map((item) => item?.name)
                    ?.join(", ")}
                </span>
              </div>
              <div>
                <span>Genres: </span>
                <span>
                  {mediaData?.genres?.map((item) => item?.name)?.join(", ")}
                </span>
              </div>
              <div>
                <span>Companies: </span>
                <span>
                  {mediaData?.production_companies
                    ?.map((item) => item?.name)
                    ?.join(", ")}
                </span>
              </div>
              <div>
                <span>Countries: </span>
                <span>
                  {mediaData?.production_countries
                    ?.map((item) => item?.name)
                    ?.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] overflow-hidden">
                  <CircularProgressbar
                    value={mediaData?.vote_average * 10}
                    text={`${Math.round(
                      Number(mediaData?.vote_average) * 10
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
                  {mediaData?.popularity}
                </div>
                <div>
                  <span>Vote: </span>
                  {mediaData?.vote_count}
                </div>
              </div>
              <div>{mediaData?.overview}</div>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    addMovie({
                      body: {
                        media_id: id,
                        media_type: searchParams.get(`media_type`),
                      },
                    });
                  }}
                  className="btn btn-success"
                >
                  <FaHeart />
                  <span>Favorite</span>
                </button>
                <button
                  onClick={() => {
                    handleOpenTrailer();
                    setMediaTrailer({
                      media_id: mediaData?.id,
                      media_type: searchParams.get(`media_type`),
                    });
                  }}
                  className="btn btn-primary"
                >
                  <FaPlay />
                  <span>Play Trailer</span>
                </button>
              </div>
              <div>
                <div className="font-semibold text-base mb-2">Cast</div>
                <div className="">
                  <Swiper spaceBetween={16} slidesPerView={4}>
                    {cast?.map((item) => (
                      <SwiperSlide key={item?.id}>
                        <CharacterCard actor={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div>
        <Wrapper>
          <div className="my-8 flex flex-col gap-8 ">
            {searchParams.get(`media_type`) === `tv` && (
              <MediaSlide
                title={`Seasons`}
                media_list={mediaData?.seasons}
                media_type={searchParams.get("media_type")}
                is_view_more={false}
              />
            )}
            <MediaSlide
              title={`Recommendations`}
              media_list={recommendations.data?.results}
              media_type={searchParams.get("media_type")}
              is_view_more={false}
            />
            <MediaSlide
              title={`Similar`}
              media_list={similar.data?.results}
              media_type={searchParams.get("media_type")}
              is_view_more={false}
            />
            <ReviewList media_type={searchParams.get("media_type")} id={id} />
          </div>
        </Wrapper>
      </div>
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

export default MediaId;
