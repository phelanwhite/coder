import { BlogCard1, BlogCard1Skeleton } from "./BlogCard";
import { BlogMenuType } from "@/assets/constants/type";

type Type = {
  datas: any[];
  isLoading: boolean;
  type?: BlogMenuType;
};

export const BlogList1 = ({ isLoading, datas, type }: Type) => {
  if (isLoading)
    return (
      <div className="space-y-4">
        {Array(20)
          .fill(0)
          .map((_, index) => {
            return <BlogCard1Skeleton key={index} />;
          })}
      </div>
    );

  return (
    <div>
      {datas?.length ? (
        <div className="space-y-4">
          {datas?.map((item: any) => {
            return <BlogCard1 key={item._id} data={item} type={type} />;
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
