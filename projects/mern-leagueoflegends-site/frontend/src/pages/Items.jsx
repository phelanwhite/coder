import { useQuery } from "@tanstack/react-query";
import SearchTerm from "components/form/SearchTerm";
import SelectTerm from "components/form/SelectTerm";
import { champions_type, difficulty } from "containts/commons";
import Wrapper from "layouts/Wrapper";
import React, { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ddragonApi from "services/ddragonApi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Items = () => {
  const items = useQuery({
    queryKey: [`items`],
    queryFn: async () => {
      const res = await ddragonApi.getItems();
      return res;
    },
  });

  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    type: "all",
    difficulty: difficulty[0].value,
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
  const getItemTypes = useMemo(() => {
    return (
      items.data?.data && [
        { title: "all", value: "all" },
        ...Array.from(
          new Set(
            Object.values(items.data?.data)
              ?.map((item) => item.tags)
              ?.flat(1)
          )
        )?.map((item) => ({ title: item, value: item })),
      ]
    );
  }, [items]);

  const itemsResult = useMemo(() => {
    return (
      items.data?.data &&
      Object.values(items.data?.data).filter((champion) => {
        if (searchParams.get(`type`) === `all`) {
          return champion?.name
            ?.toLowerCase()
            ?.includes(searchParams.get(`q`)?.toLowerCase());
        } else {
          return (
            champion?.name
              ?.toLowerCase()
              ?.includes(searchParams.get(`q`)?.toLowerCase()) &&
            champion?.tags?.includes(searchParams.get(`type`))
          );
        }
      })
    );
  }, [items, searchParams]);

  return (
    <div>
      <Wrapper>
        <div className="py-6 lg:py-10 text-center">
          <div className="title-4">CHOOSE YOUR</div>
          <div className="title-1 italic font-bold leading-[5rem]">Items</div>
          <div className="title-5 leading-[2rem]">
            With more than 140 champions, you’ll find the perfect match for your
            playstyle. Master one, or master them all.
          </div>
        </div>
        {items?.data?.data?.length}
        <div>
          <div className="flex gap-4 flex-col md:flex-row">
            <SearchTerm
              value={searchParams.get(`q`)}
              onChange={(e) => handleSearchParams(`q`, e.target.value)}
            />
            <SelectTerm
              value={searchParams.get(`type`)}
              onChange={(e) => handleSearchParams(`type`, e.target.value)}
              datalist={getItemTypes}
            />
          </div>
        </div>
        <div className="py-12 flex flex-wrap justify-center gap-2 ">
          {itemsResult?.map((item, index) => (
            <div key={index}>
              <div className="w-10 h-10 rounded cursor-pointer overflow-hidden">
                <img
                  loading="lazy"
                  src={ddragonApi.getImageItem(item?.image?.full)}
                  alt=""
                />
              </div>
              {/* <div className="bg-stone-100 p-4 rounded">
                  <div>{item?.name}</div>
                  <div>{item?.gold?.total}</div>
                  <div>{item?.gold?.sell}</div>
                  <div
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>
                </div>
                <Tooltip place="top" effect="solid"></Tooltip> */}
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Items;
