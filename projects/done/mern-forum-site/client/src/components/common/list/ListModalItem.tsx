import axiosConfig from "@/configs/axios-config";
import { useMutation } from "@tanstack/react-query";
import React, { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ListModalItem = ({ data, blog_id }: { data: any; blog_id: string }) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    data?.isChecked ? setChecked(true) : setChecked(false);
  }, [data?.isChecked]);

  const addRemoveResult = useMutation({
    mutationFn: async () => {
      if (!checked) {
        const url = `list/add-item`;
        return (await axiosConfig.post(url, { blog: blog_id, list: data?._id }))
          .data;
      } else {
        const url = `list/remove-item?_list=${data?._id}&_blog=${blog_id}`;
        return (await axiosConfig.delete(url)).data;
      }
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
    <label
      htmlFor={`checkbox-${data?._id}`}
      className="flex items-center gap-2"
    >
      <input
        id={`checkbox-${data?._id}`}
        type="checkbox"
        checked={checked}
        onChange={() => addRemoveResult.mutate()}
      />
      <span>{data.title}</span>
    </label>
  );
};

export default memo(ListModalItem);
