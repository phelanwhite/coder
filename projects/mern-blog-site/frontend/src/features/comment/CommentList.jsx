import { useThemeContext } from "contexts/themeContext";
import React from "react";

const CommentList = ({ data = [] }) => {
  const { theme } = useThemeContext();
  return (
    <div className="flex flex-col gap-4">
      {data?.map((item, index) => (
        <div key={index}>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img src={item?.author?.avatar} loading="lazy" alt="" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="font-semibold line-clamp-1">
                {item.author?.name}
              </div>
              <div
                className={[
                  `p-4 rounded-lg`,
                  !theme ? `bg-stone-100` : `bg-gray-900`,
                ].join(` `)}
              >
                <div className="text-secondaryColor text-xs mb-2">
                  {new Date(item?.updatedAt).toDateString()}
                </div>
                <div dangerouslySetInnerHTML={{ __html: item?.comment }}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
