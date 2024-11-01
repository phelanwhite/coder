import axiosConfig from "@/configs/axios-config";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { FC, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  id: string;
}

const ButtonFollowing: FC<Props> = ({ id }) => {
  const { user } = useAuthStore();
  const checkFollowingResult = useQuery({
    queryKey: ["follow", id],
    queryFn: async () => {
      const response = await axiosConfig.get(`/follow/check-following/${id}`);
      return response.data;
    },

    enabled: !!user,
  });
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    checkFollowingResult.data?.data ? setChecked(true) : setChecked(false);
  }, [checkFollowingResult.data]);

  const followResult = useMutation({
    mutationFn: async () => {
      return (await axiosConfig.post(`/follow/following-unfollowing/${id}`))
        .data;
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
      onClick={() => followResult.mutate()}
      className="btn btn-success rounded-full text-xs"
    >
      {!checked ? `Follow` : `Unfollow`}
    </button>
  );
};

export default memo(ButtonFollowing);
