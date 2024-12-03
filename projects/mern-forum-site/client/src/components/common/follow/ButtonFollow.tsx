import ButtonComponent from "@/components/form/button-component";
import Loader from "@/components/form/loader";
import { useFollowStore } from "@/stores/follow-store";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Type = {
  isFollow: boolean;
  follow: string;
};

const ButtonFollow = ({ follow, isFollow }: Type) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(isFollow);
  }, [isFollow]);

  const { followUnfollow } = useFollowStore();
  const addRemveFavoriteResult = useMutation({
    mutationFn: async () => {
      return await followUnfollow({
        follow,
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
  return (
    <>
      {addRemveFavoriteResult.isPending && <Loader />}
      <ButtonComponent
        onClick={() => addRemveFavoriteResult.mutate()}
        color="black"
        className="rounded-full"
        size="xs"
      >
        {checked ? `Un Follow` : `Follow`}
      </ButtonComponent>
    </>
  );
};

export default ButtonFollow;
