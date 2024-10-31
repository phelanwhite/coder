import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import Modal from "./Modal";
import MyListAddBox from "./MyListAddBox";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useExistingItemQuery } from "../stores/myListApi";
import { useListBoxContext } from "../context/ListBoxContext";

const ButtonList = ({ id, media_type }: { id: string; media_type: string }) => {
  const user = useSelector((state: any) => state?.authSlice?.currentUser);
  const [checked, setChecked] = useState(false);
  const checkedResult = useExistingItemQuery(`id=${id}&type=${media_type}`, {
    skip: user ? false : true,
  });
  useEffect(() => {
    checkedResult.data ? setChecked(true) : setChecked(false);
  }, [checkedResult.data]);

  const { handleOpenListBox } = useListBoxContext();
  return (
    <>
      <button
        onClick={() => {
          if (!user) {
            toast.error(`Please login`);
            return;
          }
          handleOpenListBox({
            id,
            type: media_type,
          });
        }}
        title="Add to list"
        className={clsx(
          `bg-[rgb(3,37,65)] rounded-full w-12 h-12 overflow-hidden flex items-center justify-center`,
          checked ? "text-red-500" : "text-white"
        )}
      >
        <FaList />
      </button>
    </>
  );
};

export default memo(ButtonList);
