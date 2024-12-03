import Loader from "@/components/form/loader";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

type Type = {
  isBookmark: boolean;
  data: string;
  type: "post" | "list";
};

const ButtonBookmark = ({ isBookmark, data, type }: Type) => {
  const { addRemveBookmark } = useBookmarkStore();
  const addRemveBookmarkResult = useMutation({
    mutationFn: async () => {
      return await addRemveBookmark({
        type,
        data,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setChecked(!checked);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(isBookmark);
  }, [isBookmark]);
  return (
    <>
      {addRemveBookmarkResult.isPending && <Loader />}
      <button onClick={() => addRemveBookmarkResult.mutate()}>
        {checked ? <GoBookmarkFill /> : <GoBookmark />}
      </button>
    </>
  );
};

export default memo(ButtonBookmark);
