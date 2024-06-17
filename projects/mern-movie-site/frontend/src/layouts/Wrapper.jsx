import React, { memo } from "react";

const Wrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default memo(Wrapper);
