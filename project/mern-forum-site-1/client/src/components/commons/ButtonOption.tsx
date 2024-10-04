import React, { FC, memo, useEffect, useRef, useState } from "react";

interface Props {
  label: React.ReactNode;
  children: React.ReactNode;
}

const ButtonOption: FC<Props> = ({ children, label }) => {
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
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpenMenu(!isOpenMenu)}>{label}</button>
      {isOpenMenu && (
        <div
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="z-50 py-2 absolute right-0 shadow rounded border min-w-[120px] bg-white text-textSecondaryColor"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default memo(ButtonOption);
