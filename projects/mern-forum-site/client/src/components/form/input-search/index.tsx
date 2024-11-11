import { memo, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const InputSearch = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <div className="max-w-[420px] w-full rounded-full border flex items-center gap-2  px-4 h-10">
      <MdSearch size={20} className="text-text-secondary-color-2" />
      <input
        type="text"
        className="w-full border-none outline-none bg-transparent py-2"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/search?_q=${value}`);
          }
        }}
      />
    </div>
  );
};

export default memo(InputSearch);
