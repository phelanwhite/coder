import clsx from "clsx";
import React, { FC, memo, useRef } from "react";
import { MdSearch } from "react-icons/md";

interface Props extends React.ComponentProps<"input"> {}

const InputSearch: FC<Props> = ({ className, ...props }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div className={className}>
      <div
        onClick={handleClick}
        className={clsx(
          `flex items-center gap-2 px-3 py-1.5 border rounded-lg `
          // "hover:border-gray-300 focus:border-blue-600",
        )}
      >
        <MdSearch size={20} />
        <input
          ref={inputRef}
          type="text"
          {...props}
          className="flex-1 border-none outline-none text-sm"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default memo(InputSearch);
