import React from "react";
import { UserItem, UserItemSkeleton } from "./UserItem";
type Type = {
  datas: any[];
  isLoading: boolean;
};
const UserItemList = ({ datas, isLoading }: Type) => {
  if (isLoading)
    return (
      <div className="space-y-4">
        {Array(20)
          .fill(0)
          .map((_, index) => {
            return <UserItemSkeleton key={index} />;
          })}
      </div>
    );

  return (
    <div>
      {datas.length ? (
        <div className="space-y-4">
          {datas?.map((item: any) => {
            return <UserItem key={item._id} data={item} />;
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

export default UserItemList;
