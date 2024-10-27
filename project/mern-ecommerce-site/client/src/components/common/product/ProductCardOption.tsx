import { useBookmarkStore } from "@/stores/bookmark-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

const ProductCardOption = ({ data }: { data: any }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const { createBookmark, deleteBookmarkByProductId } = useBookmarkStore();
  const createDeleteBookmarkResult = useMutation({
    mutationFn: async () => {
      if (isBookmark) {
        return await deleteBookmarkByProductId(data._id);
      } else {
        return await createBookmark({
          product: data._id,
        });
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setIsBookmark(!isBookmark);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const { createWishlist, deleteWishlistByProductId } = useWishlistStore();
  const createDeleteWishlistResult = useMutation({
    mutationFn: async () => {
      if (isWishlist) {
        return await deleteWishlistByProductId(data._id);
      } else {
        return await createWishlist({
          product: data._id,
        });
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setIsWishlist(!isWishlist);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (data) {
      data.isBookmark ? setIsBookmark(true) : setIsBookmark(false);
      data.isWishlist ? setIsWishlist(true) : setIsWishlist(false);
    }
  }, [data]);

  return (
    <div className="z-10 absolute top-1.5 right-1.5 border flex flex-col items-center gap-3 overflow-hidden rounded-md  bg-white shadow p-1.5">
      <button onClick={() => createDeleteBookmarkResult.mutate()}>
        {isBookmark ? (
          <IoBookmark size={16} />
        ) : (
          <IoBookmarkOutline size={16} />
        )}
      </button>
      <button onClick={() => createDeleteWishlistResult.mutate()}>
        {isWishlist ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
      </button>
    </div>
  );
};

export default memo(ProductCardOption);
