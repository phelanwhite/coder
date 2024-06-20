import React, { memo } from "react";

const Footer = () => {
  return (
    <div>
      <div className="text-xs text-center">
        &copy; 2023 - {new Date().getFullYear()} by PhelanWhite. All Rights
        Reserved
      </div>
    </div>
  );
};

export default memo(Footer);
