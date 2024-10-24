import ButtonOption from "@/components/commons/ButtonOption";
import ListSelectBox from "@/components/commons/list/ListSelectBox";
import { copyToClipboard } from "@/libs/utils/text";
import React, { memo, useState } from "react";
import toast from "react-hot-toast";
import { HiDotsHorizontal } from "react-icons/hi";

const BlogByIdMenu = () => {
  const handleCopyLink = async () => {
    try {
      await copyToClipboard(window.location.href);
      toast.success("Link copied successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy link");
    }
  };
  const [isOpenList, setIsOpenList] = useState(false);
  return (
    <>
      <ListSelectBox isOpen={isOpenList} onClose={() => setIsOpenList(false)} />
      <ButtonOption label={<HiDotsHorizontal />}>
        <div>
          <button
            onClick={() => setIsOpenList(true)}
            className="text-left px-4 py-2 block w-max hover:text-textColor"
          >
            Add to list
          </button>
          <button
            onClick={handleCopyLink}
            className="text-left px-4 py-2 block w-max hover:text-textColor"
          >
            Copy link
          </button>
        </div>
      </ButtonOption>
    </>
  );
};

export default memo(BlogByIdMenu);
