import React, { memo } from "react";

const Logo = () => {
  return (
    <div className="text-2xl font-bold">
      <span>Phelan</span>
      <span className="text-red-500">Flix</span>
    </div>
  );
};

export default memo(Logo);
