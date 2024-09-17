import React, { memo, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import {
  useAddFavoriteMutation,
  useCheckFavoriteQuery,
  useRemoveFavoriteMutation,
} from "../stores/favoriteApi";
import Loader from "./loader";
import { useSelector } from "react-redux";

const ButtonFavorite = ({
  favouriteId,
  favouriteType,
}: {
  favouriteId: string;
  favouriteType: string;
}) => {
  const user = useSelector((state: any) => state?.authSlice?.currentUser);
  //
  const [checked, setChecked] = useState(false);
  const checkedResult = useCheckFavoriteQuery(
    `favouriteId=${favouriteId}&favouriteType=${favouriteType}`,
    {
      skip: user ? false : true,
    }
  );
  useEffect(() => {
    checkedResult.data ? setChecked(true) : setChecked(false);
  }, [checkedResult.data]);

  //
  const [addFavorite, addFavoriteResult] = useAddFavoriteMutation();
  const [remoteFavorite, remoteFavoriteResult] = useRemoveFavoriteMutation();
  const toggleFavorite = () => {
    if (checked) {
      remoteFavorite(checkedResult.data?._id);
    } else {
      addFavorite({ favouriteId, favouriteType });
    }
  };
  if (addFavoriteResult.isLoading || remoteFavoriteResult.isLoading)
    return <Loader />;
  return (
    <button
      onClick={toggleFavorite}
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
