import ProductCard from "features/product/ProductCard";
import { memo, useState } from "react";

const SuggestionToday = ({ data }) => {
  const [indexTab, setIndexTab] = useState(0);
  return (
    <div>
      <div className="rounded-lg bg-white">
        <div className="py-3 px-4 font-bold text-base">{data?.title}</div>
        <div className="overflow-x-auto sticky top-0">
          <div className="flex">
            {data?.tabs?.map((item, index) => (
              <div
                key={item?.icon}
                onClick={() => setIndexTab(index)}
                className={[
                  `py-2 px-1 min-w-[140px] md:min-h-[78px] md:min-w-[190px] text-xs flex flex-col gap-1 items-center cursor-pointer`,
                  index === indexTab &&
                    "bg-blue-100 text-blue-500 border-b border-blue-500",
                ].join(" ")}
              >
                <div className="w-8 h-8 md:w-10 md:h-10">
                  <img src={item?.icon} alt={item?.icon} />
                </div>
                <div>{item?.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-2 md:px-0 pt-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data?.tabs?.[indexTab]?.items?.map((item) => (
          <ProductCard item={item} key={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default memo(SuggestionToday);
