import React, { memo, useCallback } from "react";

const ButtonScrollTop = () => {
  const handleScrollTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <button onClick={handleScrollTop}>top</button>
    </div>
  );
};

export default memo(ButtonScrollTop);
