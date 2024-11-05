import { memo, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import clsx from "clsx";
import { useFavoriteStore } from "@/stores/favorite-store";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type Type = {
  media_id: string;
  media_type: string;
  isChecked: boolean;
};
const ButtonFavorite = ({ media_id, media_type, isChecked }: Type) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    isChecked ? setChecked(true) : setChecked(false);
  }, [isChecked]);

  const { addRemoveFavorite } = useFavoriteStore();
  const handleToggleFavoriteResult = useMutation({
    mutationFn: async () => {
      return await addRemoveFavorite({ media_id, media_type });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setChecked(!checked);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <button
      onClick={() => handleToggleFavoriteResult.mutate()}
      title="Marks as favorite"
      className={clsx(
        `bg-[rgb(3,37,65)] rounded-full w-12 h-12 overflow-hidden flex items-center justify-center`,
        checked ? "text-red-500" : "text-white"
      )}
    >
      <FaHeart />
    </button>
  );
};

export default memo(ButtonFavorite);
