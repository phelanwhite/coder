import React, { memo } from "react";
import Logo from "./Logo";

const Loader = () => {
  return (
    <div className="bg-black/50 text-white fixed top-0 left-0 bottom-0 right-0 z-[1000] flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <Logo />
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default memo(Loader);
