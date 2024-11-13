import { FC, memo, useEffect } from "react";

type Type = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ children, isOpen, onClose }: Type) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    //  else {
    //   document.body.style.overflow = "auto";
    // }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="z-[1300] fixed inset-0">
      <div
        onMouseDown={onClose}
        aria-hidden="true"
        className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 transition -z-[1]"
      ></div>
      <div
        className="relative top-[50%]
       left-[50%] -translate-x-[50%] -translate-y-[50%] p-4 flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
};

export default memo(Modal);
