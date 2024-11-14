import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import Skeleton from "react-loading-skeleton";

export const UserItem = ({ data }: { data: any }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 overflow-hidden rounded-full">
        <img src={data?.avatar || IMAGES_DEFAULT.account_notfound} alt="" />
      </div>
      <div>
        <div className="text-sm font-medium">{data?.name}</div>
        <div className="text-xs font-medium text-gray-500">
          Email: {data?.email}
        </div>
        <div className="text-xs font-medium text-gray-500">
          Role: {data?.role}
        </div>
        <div className="text-xs font-medium text-gray-500">
          Joined: {new Date(data?.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
export const UserItemSkeleton = () => {
  return (
    <div className="flex items-start gap-4">
      <Skeleton height={32} width={32} circle />
      <div className="flex-1">
        <Skeleton count={4} />
      </div>
    </div>
  );
};
