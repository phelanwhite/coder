import { memo, useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useBookmarkStore } from "@/stores/bookmark-store";

type Type = {
  media_id: string;
  media_type: string;
  isChecked: boolean;
};
const ButtonBookmark = ({ media_id, media_type, isChecked }: Type) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    isChecked ? setChecked(true) : setChecked(false);
  }, [isChecked]);

  const { addRemoveBookmark } = useBookmarkStore();
  const handleToggleFavoriteResult = useMutation({
    mutationFn: async () => {
      return await addRemoveBookmark({ media_id, media_type });
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
      <FaBookmark />
    </button>
  );
};

export default memo(ButtonBookmark);
