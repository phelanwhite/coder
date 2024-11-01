import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Loader from "../loader";
import { useCommentStore } from "@/stores/comment-store";

const CommentItemButtonMenu = ({ data }: { data: any }) => {
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
  const { deleteCommentById } = useCommentStore();
  const deleteBlogByIdResult = useMutation({
    mutationFn: async () => {
      return deleteCommentById(data?._id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  if (deleteBlogByIdResult.isPending) return <Loader />;

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <HiOutlineDotsHorizontal />
      </button>
      {isOpen && (
        <div className="button-show-menu absolute top-8 right-0 z-[999] bg-white shadow-lg border py-2 rounded-lg w-[230px] text-sm">
          <button
            onClick={() => {
              deleteBlogByIdResult.mutate();
              setIsOpen(false);
            }}
            className="flex gap-4 items-center px-5 py-3 hover:bg-gray-100 w-full"
          >
            <span className="flex-1 text-left">Remove</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(CommentItemButtonMenu);
