import ButtonMenu from "@/components/form/button-menu";
import Modal from "@/components/layout/modal";
import React, { memo, useState } from "react";
import toast from "react-hot-toast";
import { BiLink } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import LitsModal from "../list/LitsModal";
import { useAuthStore } from "@/stores/auth-store";

const BlogCardButtonMenu = ({ data }: { data: any }) => {
  const [isOpenListModel, setIsOpenListModel] = useState(false);
  const handleCopyClipboard = async () => {
    await navigator.clipboard
      .writeText(window.location.href)
      .then((value) => {
        toast.success(`Copy link successfully!`);
      })
      .catch((err) => {
        toast.error(`Failed to copy link! Please try again later.`);
        console.error(err);
      });
  };

  return (
    <>
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
        <button
          onClick={() => setIsOpenListModel(true)}
          className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
        >
          <IoMdAddCircleOutline size={16} />
          <span className="flex-1 text-left">Add to list</span>
        </button>
        <button className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full">
          <MdReportProblem size={16} />
          <span className="flex-1 text-left">Report article</span>
        </button>
      </ButtonMenu>
      <LitsModal
        isOpen={isOpenListModel}
        onClose={() => setIsOpenListModel(false)}
        blog_id={data?._id}
      />
    </>
  );
};

export default memo(BlogCardButtonMenu);
