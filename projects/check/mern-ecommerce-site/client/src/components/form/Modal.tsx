import React, { FC, useEffect } from "react";
import { MdClose } from "react-icons/md";
interface Props {
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  content?: string;
  children: React.ReactNode;
}
const Modal: FC<Props> = ({ isOpen, onClose, children, content, title }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return <></>;
  return (
    <div className="z-50 fixed top-0 left-0 bottom-0 right-0">
      <div
        onClick={onClose}
        className="-z-10 absolute top-0 left-0 bottom-0 right-0 bg-black/50"
      ></div>
      <div className="z-10 max-w-[1000px] w-full mx-auto p-4">
        <div className="mt-10 py-4 px-8 relative rounded-lg bg-white shadow">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-gray-100 hover:bg-gray-200 p-1"
          >
            <MdClose size={20} />
          </button>
          <div>
            <div className="font-medium text-2xl mb-2">{title}</div>
            <div className="mb-4 text-base">{content}</div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
