import React from "react";
import { Outlet } from "react-router-dom";
import NavRight from "./NavRight";

const RootLayout = () => {
  return (
    <div className="flex items-start justify-evenly max-w-[1336px] mx-auto">
      {/* rigth  */}
      <div className="max-w-[728px] w-full px-6">
        <Outlet />
      </div>
      {/* left  */}
      <div className="hidden iPad:block max-w-[350px] w-full border-l border-[#F2F2F2] px-6 space-y-10">
        <NavRight />
      </div>
    </div>
  );
};

export default RootLayout;
