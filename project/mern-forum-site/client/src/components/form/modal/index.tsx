import React, { FC, memo } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />
      <div className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] w-[300px] h-[200px] bg-white p-4 rounded-md shadow-xl z-10">
        {children}
      </div>
      {/* close button */}
      <button
        className="absolute top-2 right-2 text-sm text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        X
      </button>

      {/* modal content */}
      {children}

      {/* modal footer */}
      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 text-sm text-white bg-blue-500"></button>
      </div>
    </div>
  );
};

export default memo(Modal);
