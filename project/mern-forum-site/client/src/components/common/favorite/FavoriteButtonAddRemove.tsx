import { useFavoriteStore } from "@/stores/favorite-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteButtonAddRemove = ({
  blogId,
  favorite,
}: {
  blogId: string;
  favorite: any;
}) => {
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    favorite?.isFavorite && setChecked(favorite);
    setCount(favorite?.count_favorite);
  }, [favorite]);

  const { addRemoveFavorite } = useFavoriteStore();
  const addRemoveBookmarkResult = useMutation({
    mutationFn: async () => {
      return await addRemoveFavorite({
        blog: blogId,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setChecked(!checked);
      setCount((prev) => (!checked ? prev + 1 : prev - 1));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <button
      onClick={() => addRemoveBookmarkResult.mutate()}
      className="flex items-center gap-1"
    >
      {checked ? <FaHeart /> : <FaRegHeart />}
      <span>{count}</span>
    </button>
  );
};

export default memo(FavoriteButtonAddRemove);
