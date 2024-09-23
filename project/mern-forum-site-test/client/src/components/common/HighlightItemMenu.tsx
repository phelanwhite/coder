import { useCommentStore } from "@/store/comment-store";
import { useHighlightStore } from "@/store/library-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import Loader from "../layout/loader";

const HighlightItemMenu = ({ data }: { data: any }) => {
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

  const { deleteHighlightById } = useHighlightStore();
  const deleteHighlightByIdResult = useMutation({
    mutationFn: async () => {
      const response = await deleteHighlightById(data?._id);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  if (deleteHighlightByIdResult.isPending) return <Loader />;
  return (
    <div className="relative " ref={menuRef}>
      <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
        <IoIosArrowDown />
      </button>
      {isOpenMenu && (
        <div className="z-10 py-2 absolute right-0 shadow rounded border min-w-[120px] bg-white">
          {/* <button className="text-left px-4 py-2 block w-max hover:text-textColor">
            Edit response
          </button>
          <button className="text-left px-4 py-2 block w-max hover:text-textColor">
            View stats
          </button> */}
          <button
            onClick={() => deleteHighlightByIdResult.mutate()}
            className="text-left px-4 py-2 block w-max text-red-500 hover:text-textColor"
          >
            Remove article
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(HighlightItemMenu);
