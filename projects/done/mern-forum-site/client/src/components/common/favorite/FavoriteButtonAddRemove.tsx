import { useFavoriteStore } from "@/stores/favorite-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteButtonAddRemove = ({
  blogId,
  isFavorite,
  count_favorite,
}: {
  blogId: string;
  isFavorite: any;
  count_favorite: number;
}) => {
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    isFavorite ? setChecked(true) : setChecked(false);
    setCount(count_favorite);
  }, [isFavorite, count_favorite]);

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
