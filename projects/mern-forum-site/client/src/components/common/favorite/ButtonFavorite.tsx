import Loader from "@/components/form/loader";
import { useFavoriteStore } from "@/stores/favorite-store";
import { useMutation } from "@tanstack/react-query";
import React, { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type Type = {
  isFavorite: boolean;
  data: string;
  type: "post" | "list";
  total_favorite?: number; // For favorite counter (if exist)
};

const ButtonFavorite = ({ isFavorite, total_favorite, data, type }: Type) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    total_favorite && setCount(total_favorite);
  }, [total_favorite]);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(isFavorite);
  }, [isFavorite]);

  const { addRemveFavorite } = useFavoriteStore();
  const addRemveFavoriteResult = useMutation({
    mutationFn: async () => {
      return await addRemveFavorite({
        type,
        data,
      });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setChecked(!checked);
      setCount(checked ? count - 1 : count + 1);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <>
      {addRemveFavoriteResult.isPending && <Loader />}
      <button
        className="flex items-center gap-1"
        onClick={() => addRemveFavoriteResult.mutate()}
      >
        {checked ? <FaHeart /> : <FaRegHeart />}
        {count && count}
      </button>
    </>
  );
};

export default memo(ButtonFavorite);
