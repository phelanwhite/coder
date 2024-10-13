import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiLink } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";
import { MdReportProblem } from "react-icons/md";

const BlogButtonMenu = () => {
  //
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  //
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
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <HiOutlineDotsHorizontal />
      </button>
      {isOpen && (
        <div className="button-show-menu absolute top-8 right-0 z-[999] bg-white shadow-lg border py-2 rounded-lg w-[230px] text-sm">
          <button
            onClick={() => {
              handleCopyClipboard();
              setIsOpen(false);
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
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
          >
            <MdReportProblem size={16} />
            <span className="flex-1 text-left">Report article</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogButtonMenu;
