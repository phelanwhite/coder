import { useBookmarkStore } from "@/stores/bookmark-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiBookmarkSimpleFill, PiBookmarkSimpleLight } from "react-icons/pi";

const BookmarkButtonAddRemove = ({
  blogId,
  isBookmark,
}: {
  isBookmark: boolean;
  blogId: string;
}) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(isBookmark);
  }, [isBookmark]);

  const { addRemoveBookmark } = useBookmarkStore();
  const addRemoveBookmarkResult = useMutation({
    mutationFn: async () => {
      return await addRemoveBookmark({
        blog: blogId,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setChecked(!checked);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <button onClick={() => addRemoveBookmarkResult.mutate()}>
      {checked ? (
        <PiBookmarkSimpleFill size={20} />
      ) : (
        <PiBookmarkSimpleLight size={20} />
      )}
    </button>
  );
};

export default memo(BookmarkButtonAddRemove);
