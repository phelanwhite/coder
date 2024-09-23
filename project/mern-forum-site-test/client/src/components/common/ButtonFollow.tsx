import axiosConfig from "@/config/axios-config";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import Loader from "../layout/loader";
import toast from "react-hot-toast";
import { useFollowStore } from "@/store/follow-store";

const ButtonFollow = ({ authorId }: { authorId: string }) => {
  const { user } = useAuthStore();
  const [checked, setChecked] = useState(false);
  const checkedFollowingResult = useQuery({
    queryKey: ["checkedFollowing", authorId],
    queryFn: async () => {
      const url = `follow/check-following?followingId=${authorId}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    enabled: !!authorId && !!user, //
  });
  useEffect(() => {
    checkedFollowingResult.data?.data ? setChecked(true) : setChecked(false);
  }, [checkedFollowingResult.data]);

  const { followingUnfollowing } = useFollowStore();
  const followingUnfollowingResult = useMutation({
    mutationFn: async () => {
      return await followingUnfollowing(authorId);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setChecked(!checked);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  if (followingUnfollowingResult.isPending) return <Loader />;

  return (
    <button
      title={user?._id === authorId ? "You are the author" : ""}
      disabled={user?._id === authorId}
      onClick={() => followingUnfollowingResult.mutate()}
      className="btn-primary text-xs"
    >
      {checked ? `Following` : `Follow`}
    </button>
  );
};

export default memo(ButtonFollow);
