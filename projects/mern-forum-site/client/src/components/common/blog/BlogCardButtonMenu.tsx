import ButtonMenu from "@/components/form/button-menu";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { BiLink } from "react-icons/bi";
import { MdReportProblem } from "react-icons/md";

const BlogCardButtonMenu = () => {
  const handleCopyClipboard = async () => {
    await navigator.clipboard
      .writeText("https://example.com")
      .then((value) => {
        toast.success(`Copy link successfully!`);
      })
      .catch((err) => {
        toast.error(`Failed to copy link! Please try again later.`);
        console.error(err);
      });
  };

  return (
    <ButtonMenu>
      <button
        onClick={() => {
          handleCopyClipboard();
        }}
        className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
      >
        <BiLink size={16} />
        <span className="flex-1 text-left">Copy link</span>
      </button>
      {/* <button className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full">
            <IoAddOutline size={16} />
            <span className="flex-1 text-left">Add to list</span>
          </button> */}
      <button className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full">
        <MdReportProblem size={16} />
        <span className="flex-1 text-left">Report article</span>
      </button>
    </ButtonMenu>
  );
};

export default memo(BlogCardButtonMenu);
