import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Loader from "../loader";
import { useFavoriteStore } from "@/stores/favorite-store";

const FavoriteItemButtonMenu = ({ data }: { data: any }) => {
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
  const { deleteFavoritesById } = useFavoriteStore();
  const deleteFavoritesByIdResult = useMutation({
    mutationFn: async () => {
      return deleteFavoritesById(data?._id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  if (deleteFavoritesByIdResult.isPending) return <Loader />;

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <HiOutlineDotsHorizontal />
      </button>
      {isOpen && (
        <div className="button-show-menu absolute top-8 right-0 z-[999] bg-white shadow-lg border py-2 rounded-lg w-[230px] text-sm">
          <button
            onClick={() => {
              deleteFavoritesByIdResult.mutate();
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

export default FavoriteItemButtonMenu;
