import React, { memo } from "react";
import { ListItem, ListItemSkeleton } from "./ListItem";

type Type = {
  datas: any[];
  isLoading: boolean;
};

const ListItemList = ({ datas, isLoading }: Type) => {
  if (isLoading)
    return (
      <div className="space-y-4">
        {Array(20)
          .fill(0)
          .map((_, index) => {
            return <ListItemSkeleton key={index} />;
          })}
      </div>
    );
  return (
    <div>
      {datas?.length ? (
        <div className="space-y-4">
          {datas?.map((item: any) => {
            return <ListItem key={item._id} data={item} />;
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

export default memo(ListItemList);
