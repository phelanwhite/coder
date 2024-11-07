import axiosConfig from "@/configs/axios-config";
import { useMutation } from "@tanstack/react-query";
import { FC, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ButtonFollow = ({ data }: { data: any }) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    data?.isFollowing ? setChecked(true) : setChecked(false);
  }, [data]);

  const followResult = useMutation({
    mutationFn: async () => {
      const url = `follow/following-unfollowing/${data?._id}`;
      return (await axiosConfig.post(url)).data;
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

export default memo(ButtonFollow);
