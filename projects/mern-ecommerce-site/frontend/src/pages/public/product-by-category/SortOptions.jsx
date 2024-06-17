import React, { memo, useState } from "react";
import { CiFilter } from "react-icons/ci";
import FilterOptions from "./FilterOptions";
const SortOptions = ({ dataSort, dataFilter, onchange }) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  return (
    <div className="rounded-lg bg-white py-3 px-4 overflow-x-auto">
      <div className="flex items-center gap-2">
        {dataSort?.map((item) => (
          <button
            className={[`btn min-w-max`, item?.selected && `bg-stone-100`].join(
              " "
            )}
            key={item.query_value}
            value={item?.query_value}
            onClick={(e) => onchange(`sort`, item?.query_value)}
          >
            {item.display_value}
          </button>
        ))}
      </div>
      <div className="mt-4 py-4 border-t">
        <button className="flex items-center gap-2">
          <CiFilter size={20} />
          <span>Lọc</span>
        </button>
      </div>
      <div
        className={[
          `z-10 fixed top-0 bottom-0 right-0 left-0 bg-black/50 overflow-hidden`,
          // isShowFilter ? `` : `left-0`,
        ].join(` `)}
      >
        <FilterOptions data={dataFilter} />
      </div>
    </div>
  );
};

export default memo(SortOptions);
