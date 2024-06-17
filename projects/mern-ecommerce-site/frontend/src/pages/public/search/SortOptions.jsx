import React, { memo } from "react";

const SortOptions = ({ data, onchange }) => {
  return (
    <div className="rounded-lg bg-white py-3 px-4 overflow-x-auto">
      <div className="flex items-center gap-2">
        {data?.map((item) => (
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
    </div>
  );
};

export default memo(SortOptions);
