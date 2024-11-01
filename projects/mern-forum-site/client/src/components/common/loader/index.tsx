import { memo } from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center bg-black/50 z-50 fixed top-0 left-0 bottom-0 right-0">
      <div className="text-white">Loader...</div>
    </div>
  );
};

export default memo(Loader);
