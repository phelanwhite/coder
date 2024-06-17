import { useQuery } from "@tanstack/react-query";
import SearchTerm from "components/form/SearchTerm";
import SelectTerm from "components/form/SelectTerm";
import { champions_type, difficulty } from "containts/commons";
import Wrapper from "layouts/Wrapper";
import React, { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ddragonApi from "services/ddragonApi";

const Champions = () => {
  const champions = useQuery({
    queryKey: [`champions`],
    queryFn: async () => {
      const res = await ddragonApi.getChampions();
      return res;
    },
  });

  const getChampionTypes = useMemo(() => {
    const resp =
      champions.data?.data &&
      Array.from(
        new Set(
          Object.values(champions.data?.data)
            ?.map((item) => item?.tags)
            ?.flat(1)
        )
      )?.map((item) => ({ title: item, value: item }));
    return [{ title: "all", value: "all" }].concat(resp);
  }, [champions]);

  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    type: "all",
    difficulty: getChampionTypes[0]?.value,
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

  const championResult = useMemo(() => {
    let difficulty;
    if (searchParams.get(`difficulty`) === `hard`) {
      difficulty = 8;
    } else if (searchParams.get(`difficulty`) === `medium`) {
      difficulty = 5;
    } else {
      difficulty = 0;
    }

    return (
      champions.data?.data &&
      Object.values(champions.data?.data).filter((champion) => {
        if (searchParams.get(`type`) === `all`) {
          return (
            champion?.name
              ?.toLowerCase()
              ?.includes(searchParams.get(`q`)?.toLowerCase()) &&
            Number(champion?.info?.difficulty) > difficulty
          );
        } else {
          return (
            champion?.name
              ?.toLowerCase()
              ?.includes(searchParams.get(`q`)?.toLowerCase()) &&
            champion?.tags?.includes(searchParams.get(`type`)) &&
            Number(champion?.info?.difficulty) > difficulty
          );
        }
      })
    );
  }, [champions, searchParams]);
  console.log({ championResult, getChampionTypes });
  return (
    <div>
      <Wrapper>
        <div className="py-6 lg:py-10 text-center">
          <div className="title-4">CHOOSE YOUR</div>
          <div className="title-1 italic font-bold leading-[5rem]">
            CHAMPION
          </div>
          <div className="title-5 leading-[2rem]">
            With more than 140 champions, you’ll find the perfect match for your
            playstyle. Master one, or master them all.
          </div>
        </div>
        <div>
          <div className="flex gap-4 flex-col md:flex-row">
            <SearchTerm
              value={searchParams.get(`q`)}
              onChange={(e) => handleSearchParams(`q`, e.target.value)}
            />
            <SelectTerm
              value={searchParams.get(`type`)}
              onChange={(e) => handleSearchParams(`type`, e.target.value)}
              datalist={getChampionTypes || []}
            />
            <SelectTerm
              value={searchParams.get(`difficulty`)}
              onChange={(e) => handleSearchParams(`difficulty`, e.target.value)}
              datalist={difficulty}
            />
          </div>
        </div>
        <div className="py-12 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {championResult?.map((champion) => (
            <Link
              key={champion?.id}
              to={`/champion-id/${champion?.id}`}
              className="relative aspect-thumbnail group overflow-hidden rounded"
            >
              <img
                loading="lazy"
                src={ddragonApi.getImageChampionLoading(champion?.id)}
                alt={champion?.name}
                className="rounded-lg shadow-lg cursor-pointer group-hover:scale-110 transition"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 text-xl italic font-semibold text-white transition bg-dark1 group-hover:bg-grey1">
                {champion?.name}
              </div>
            </Link>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Champions;
