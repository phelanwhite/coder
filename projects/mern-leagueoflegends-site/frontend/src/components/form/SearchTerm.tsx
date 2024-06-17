import React, { FC, InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";
const SearchTerm: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <div className="flex items-center gap-4 w-full input-box">
      <FaSearch />
      <input
        type="text"
        placeholder="Search..."
        {...props}
        className="border-none outline-none w-full"
      />
    </div>
  );
};

export default SearchTerm;
