import Loader from "@/components/layouts/loader";
import axiosConfig from "@/configs/axios-config";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const ButtonHighlight = ({ id }: { id: string }) => {
  const { user } = useAuthStore();
  // check highlight
  const [checked, setChecked] = useState(false);
  const checkedResult = useQuery({
    queryKey: ["check-highlight", id, user],
    queryFn: async () => {
      const url = `highlight/check-highlight-blog?blog=${id}`;
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
      const url = `highlight/add-remove-blog`;
      const response = (
        await axiosConfig.post(url, {
          blog: id,
        })
      ).data;
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      checked ? setChecked(false) : setChecked(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (addRemoveBLogResult.isPending) return <Loader />;

  return (
    <button
      onClick={() => {
        addRemoveBLogResult.mutate();
      }}
      className="flex items-center gap-1 hover:text-textColor"
    >
      {checked ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
    </button>
  );
};

export default memo(ButtonHighlight);
