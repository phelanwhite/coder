import { axiosConfigV1 } from "@/configs/axios-config";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import React, { FC, memo, useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

interface Props extends React.ComponentProps<"input"> {}

const InputSearch: FC<Props> = ({ className, ...props }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(`/search?_q=${value}`);
      setIsShowResults(false);
    }
  };
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsShowResults(false);
    navigate(`/post/${id}`);
    setValue("");
  };
  const debouncedInputValue = useDebounce(value, 500);
  const getDatasResult = useQuery({
    queryKey: [`search`, debouncedInputValue],
    queryFn: async () => {
      const url = `post/get-posts?_q=${debouncedInputValue}`;
      return (await axiosConfigV1.get(url)).data;
    },
    enabled: !!debouncedInputValue,
  });
  const [isShowResults, setIsShowResults] = useState(false);
  useEffect(() => {
    debouncedInputValue ? setIsShowResults(true) : setIsShowResults(false);
  }, [debouncedInputValue]);

  return (
    <div className={clsx(`relative`, className)}>
      <div
        onClick={handleClick}
        className={clsx(
          `flex items-center gap-2 px-3 py-1.5 border rounded-lg`
        )}
      >
        <MdSearch size={20} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeydown}
          onFocus={() => {
            debouncedInputValue && setIsShowResults(true);
          }}
          onBlur={() => {
            setIsShowResults(false);
          }}
          {...props}
          className="flex-1 border-none outline-none text-sm"
          placeholder="Search..."
        />
      </div>
      {isShowResults && (
        <div className="top-full mt-2 absolute w-full bg-white border shadow">
          {getDatasResult?.data?.data?.results?.map((item: any) => (
            <div
              key={item?._id}
              onMouseDown={(e) => handleMouseDown(e, item?._id)}
              className="cursor-pointer flex items-start gap-2 p-2 hover:bg-gray-100 border-b last:border-none"
            >
              <div className="w-10 aspect-video overflow-hidden rounded-sm">
                <img src={item?.thumbnail} loading="lazy" alt="" />
              </div>
              <div>
                <div className="text-xs font-medium ">{item?.title}</div>
                <div className="text-text-secondary-color text-xs">
                  {item?.user?.name}
                </div>
              </div>
            </div>
          ))}
          {getDatasResult?.data?.data?.results?.length === 0 && (
            <div className="text-sm flex items-start gap-2 p-2 hover:bg-gray-100 border-b last:border-none">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(InputSearch);
