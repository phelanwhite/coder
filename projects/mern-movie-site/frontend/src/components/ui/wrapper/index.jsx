import React, { memo } from "react";

const Wrapper = ({ children }) => {
  return <div className="max-w-[1432px] w-full mx-auto px-4">{children}</div>;
};

export default memo(Wrapper);
