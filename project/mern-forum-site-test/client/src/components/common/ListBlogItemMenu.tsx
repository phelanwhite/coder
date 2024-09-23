import { useListStore } from "@/store/library-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import Loader from "../layout/loader";
import { useParams } from "react-router-dom";

const ListBlogItemMenu = ({ data }: { data: any }) => {
  const { id } = useParams();
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

  const { addRemoveBlogByListId } = useListStore();

  const addRemoveBlogByListIdResult = useMutation({
    mutationFn: async (id: string) => {
      const response = await addRemoveBlogByListId(id, { blog_id: data._id });
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  if (addRemoveBlogByListIdResult.isPending) return <Loader />;

  return (
    <div className="relative pt-1" ref={menuRef}>
      <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
        <IoIosArrowDown />
      </button>
      {isOpenMenu && (
        <div className="z-10 py-2 absolute right-0 shadow rounded border min-w-[120px] bg-white">
          <button
            onClick={() => addRemoveBlogByListIdResult.mutate(id as string)}
            className="text-left px-4 py-2 block w-max hover:text-textColor"
          >
            Remove blog
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(ListBlogItemMenu);
