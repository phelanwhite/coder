import React, { memo, useCallback, useState } from "react";
import { FaBars } from "react-icons/fa";

const SidebarLeft = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleClose = useCallback(() => {
    setShowSidebar(false);
  }, []);
  const handleOpen = useCallback(() => {
    setShowSidebar(true);
  }, []);
  return (
    <>
      <button className="sm:hidden" onClick={handleOpen}>
        <FaBars size={24} />
      </button>
      {showSidebar && (
        <div className="bg-black/50 fixed top-0 left-0 bottom-0 right-0 z-[1000]">
          <div
            onClick={handleClose}
            className="-z-10 absolute top-0 left-0 bottom-0 right-0"
          ></div>
          <div className="overflow-auto h-screen bg-white w-[300px]"></div>
        </div>
      )}
    </>
  );
};

export default memo(SidebarLeft);
