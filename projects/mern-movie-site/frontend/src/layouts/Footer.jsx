import { menuFooterLink } from "containts/link";
import React, { memo } from "react";

const Footer = () => {
  return (
    <div className="py-8 bg-darkColor-1 text-white">
      <div className="flex justify-center gap-4 items-center">
        {menuFooterLink.map((item, index) => (
          <a href={item.path} key={index} className="hover:text-red-500">
            {item.icon}
          </a>
        ))}
      </div>
      <div className="text-xs text-center mt-4">Copyright © 2024</div>
    </div>
  );
};

export default memo(Footer);
