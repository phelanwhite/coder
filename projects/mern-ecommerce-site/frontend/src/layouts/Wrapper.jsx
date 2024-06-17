import React, { memo } from "react";

const Wrapper = ({ children }) => {
  return <div className="max-w-[1440px] w-full mx-auto">{children}</div>;
};

export default memo(Wrapper);
