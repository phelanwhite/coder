import { useCommentStore } from "@/store/comment-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";

const ResponseItemMenu = ({ data }: { data: any }) => {
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

  const { deleteCommentById } = useCommentStore();
  const deleteCommentByIdResult = useMutation({
    mutationFn: async () => {
      const response = await deleteCommentById(data?._id);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
        <IoIosArrowDown />
      </button>
      {isOpenMenu && (
        <div className="z-10 py-2 absolute right-0 shadow rounded border min-w-[120px] bg-white">
          <button className="text-left px-4 py-2 block w-max hover:text-textColor">
            Edit response
          </button>
          <button className="text-left px-4 py-2 block w-max hover:text-textColor">
            View stats
          </button>
          <button
            onClick={() => deleteCommentByIdResult.mutate()}
            className="text-left px-4 py-2 block w-max text-red-500 hover:text-textColor"
          >
            Delete response
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(ResponseItemMenu);
