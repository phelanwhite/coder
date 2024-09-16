import React, { memo } from "react";
import { FaTrello } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex items-center justify-center bg-black/50 text-white z-[1000] fixed top-0 left-0 right-0 bottom-0 inset-0">
      <div className="flex flex-col gap-2 items-center">
        <div className="text-xl font-semibold flex items-center gap-2">
          <FaTrello />
          Trello
        </div>
        <div>Loading...</div>
      </div>
    </div>
  );
};

export default memo(Loader);
