import axiosConfig from "@/configs/axios-config";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiLike, BiSolidLike } from "react-icons/bi";

const ButtonLike = ({ id }: { id: string }) => {
  const { user } = useAuthStore();

  // check like
  const [checked, setChecked] = useState(false);
  const checkedResult = useQuery({
    queryKey: ["check-like", id, user],
    queryFn: async () => {
      const url = `like/check-like-blog?blog=${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    enabled: !!user,
  });
  useEffect(() => {
    checkedResult.data?.data ? setChecked(true) : setChecked(false);
  }, [checkedResult.data]);

  const addRemoveBLogResult = useMutation({
    mutationFn: async () => {
      const url = `like/add-remove-blog`;
      const response = (
        await axiosConfig.post(url, {
          blog: id,
        })
      ).data;
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);

      if (checked) {
        setChecked(false);
        setCountLike((prev) => prev - 1);
      } else {
        setChecked(true);
        setCountLike((prev) => prev + 1);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [countLike, setCountLike] = useState(0);
  const getLikesByBlogIdResult = useQuery({
    queryKey: ["likes-by-blog-id", id],
    queryFn: async () => {
      const url = `like/get-blog-id/${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
  });
  useEffect(() => {
    getLikesByBlogIdResult.data?.data &&
      setCountLike(getLikesByBlogIdResult.data?.data?.total_row);
  }, [getLikesByBlogIdResult.data]);

  return (
    <button
      onClick={() => {
        addRemoveBLogResult.mutate();
      }}
      className="flex items-center gap-1 hover:text-textColor"
    >
      {checked ? <BiSolidLike size={16} /> : <BiLike size={16} />}
      {countLike}
    </button>
  );
};

export default memo(ButtonLike);
