import { memo, useEffect, useMemo } from "react";
import TopicCard from "./TopicCard";
import Skeleton from "react-loading-skeleton";

type Type = {
  datas: any[];
  isLoading: boolean;
};

export const TopicList = ({ isLoading, datas }: Type) => {
  if (isLoading)
    return (
      <div className="flex flex-wrap gap-4">
        {Array(20)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index}>
                <Skeleton width={50} height={20} />
              </div>
            );
          })}
      </div>
    );

  return (
    <div>
      {datas.length ? (
        <div className="flex flex-wrap gap-4">
          {datas?.map((item: any, index) => {
            return <TopicCard key={index} data={item} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="font-semibold">No results.</div>
        </div>
      )}
    </div>
  );
};
