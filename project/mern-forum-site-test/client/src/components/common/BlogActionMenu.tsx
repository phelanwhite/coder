import { memo, useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ButtonActionList from "./ButtonActionList";

const BlogActionMenu = ({ data }: { data: any }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <>
      <div className="relative pt-1" ref={menuRef}>
        <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <HiOutlineDotsHorizontal />
        </button>
        {isOpenMenu && (
          <div className="z-10 py-2 absolute right-0 shadow rounded border min-w-[120px] bg-white">
            <ButtonActionList />
          </div>
        )}
      </div>
    </>
  );
};
export default memo(BlogActionMenu);
