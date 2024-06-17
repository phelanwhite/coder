import { useQuery } from "@tanstack/react-query";
import Loader from "components/Loader";
import MediaList from "components/MediaList";
import { actor_movie_type } from "containts/constants";
import { useAddActorMutation } from "features/myActorApi";
import Wrapper from "layouts/Wrapper";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTmdbImage, getTmdbUrl } from "services/tmdbApi";

const ActorId = () => {
  const { id } = useParams();
  const [addActor, addActorResult] = useAddActorMutation();
  useEffect(() => {
    if (addActorResult.isSuccess) {
      toast.success(addActorResult.data);
    }
    if (addActorResult.isError) {
      toast.error(addActorResult.error.data?.message);
    }
  }, [addActorResult]);
  const [searchParams, setSearchParams] = useSearchParams({
    media_type: `movie`,
    page: 1,
  });
  const handleSearchParams = useCallback(
    (name, value) => {
      setSearchParams(
        (prev) => {
          prev.set(name, value);
          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );
  const actor_id = useQuery({
    queryKey: [`actor_id`, id],
    queryFn: async () => {
      const response = await getTmdbUrl(`person/${id}`);
      return response;
    },
  });
  const actorData = useMemo(() => actor_id.data, [actor_id]);

  const media_credits = useQuery({
    queryKey: [`actor_id`, Array.from(searchParams), id],
    queryFn: async () => {
      const response =
        searchParams.get(`media_type`) === `movie`
          ? await getTmdbUrl(`person/${id}/movie_credits`)
          : await getTmdbUrl(`person/${id}/tv_credits`);
      return response;
    },
  });

  if (actor_id.isLoading || media_credits.isLoading) return <Loader />;

  return (
    <div>
      <div
        className="min-h-screen text-white flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${getTmdbImage(
                  actorData?.profile_path
                )}) no-repeat center/cover`,
        }}
      >
        <Wrapper>
          <div className="w-full lg:max-w-[80%] flex flex-col md:flex-row items-start gap-8 pt-20 pb-10">
            <div className="mx-auto md:max-w-[300px] lg:max-w-[400px] w-full overflow-hidden rounded-lg">
              <img
                src={getTmdbImage(actorData?.profile_path)}
                loading="lazy"
                alt={actorData?.name || actorData?.title}
              />
            </div>
            <div className="flex-1 overflow-hidden flex flex-col gap-6">
              <div className="text-3xl font-bold">
                {actorData?.name || actorData?.title}
              </div>
              <div>
                <span>Also known as: </span>
                <span>{actorData?.also_known_as?.join(", ")}</span>
              </div>
              <div>
                <span>Birthday: </span>
                <span>{actorData?.birthday}</span>
              </div>
              <div>
                <span>Place of birth: </span>
                <span>{actorData?.place_of_birth}</span>
              </div>
              <div>
                <span>Known for department: </span>
                <span>{actorData?.known_for_department}</span>
              </div>
              <div>
                <span>Gender: </span>
                <span>
                  {String(actorData?.gender) === `1` ? `Female` : `Male`}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <span>Popularity: </span>
                  {actorData?.popularity}
                </div>
              </div>
              <div>{actorData?.biography}</div>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    addActor({
                      body: {
                        actor_id: id,
                      },
                    });
                  }}
                  className="btn btn-success"
                >
                  <FaHeart />
                  <span>Favorite</span>
                </button>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <Wrapper>
        <div className="my-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm">Select type media: </span>
              <select
                value={searchParams.get(`media_type`)}
                onChange={(e) =>
                  handleSearchParams(`media_type`, e.target.value)
                }
                className="px-4 py-1 border rounded-lg cursor-pointer "
              >
                {actor_movie_type.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <MediaList
            media_list={media_credits.data?.cast}
            media_type={searchParams.get(`media_type`)}
            changePage={handleSearchParams}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default memo(ActorId);
