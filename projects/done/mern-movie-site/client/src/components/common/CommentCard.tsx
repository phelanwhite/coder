import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import { memo } from "react";

const CommentCard = ({ data }: { data: any }) => {
  return (
    <div key={data._id} className="mt-4 flex items-start gap-2">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src={data?.user?.avatar || IMAGES_DEFAULT.account_notfound}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="bg-stone-100 flex-1 px-3 py-2 rounded-md">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{data?.user?.name}</span>
        </div>
        <div className="text-xs text-gray-500 italic mb-1">
          {new Date(data?.createdAt).toDateString()}
        </div>
        <div dangerouslySetInnerHTML={{ __html: data?.comment }}></div>
      </div>
    </div>
  );
};

export default memo(CommentCard);
