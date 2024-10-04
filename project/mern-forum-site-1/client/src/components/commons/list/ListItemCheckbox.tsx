import Loader from "@/components/layouts/loader";
import axiosConfig from "@/configs/axios-config";
import { useAuthStore } from "@/stores/auth-store";
import { useBlogListStore } from "@/stores/blog-list-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ListItemCheckbox = ({ data }: { data: any }) => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { addRemoveBlog } = useBlogListStore();
  const [checked, setChecked] = useState(false);
  // Check if this item is selected
  const checkedResult = useQuery({
    queryKey: ["checked-blog-list", user, id, data._id],
    queryFn: async () => {
      const url = `blog-list/check-exist-blog?blog=${id}&list=${data?._id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    enabled: !!user,
  });
  const addRemoveBLogResult = useMutation({
    mutationFn: async () => {
      const response = addRemoveBlog({
        blog: id,
        list: data?._id,
      });
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
  useEffect(() => {
    checkedResult.data?.data ? setChecked(true) : setChecked(false);
  }, [checkedResult.data]);

  if (addRemoveBLogResult.isPending) return <Loader />;
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => addRemoveBLogResult.mutate()}
      />
      <span>{data?.title}</span>
    </label>
  );
};

export default ListItemCheckbox;
