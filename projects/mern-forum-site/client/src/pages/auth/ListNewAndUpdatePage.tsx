import TextEditor from "@/components/form/text-editor";
import axiosConfig from "@/configs/axios-config";
import { useListStore } from "@/stores/list-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";

const ListNewAndUpdatePage = () => {
  const location = useLocation();
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    location.pathname.includes(`update-list`)
      ? setIsUpdate(true)
      : setIsUpdate(false);
  }, [location.pathname]);

  const { createList, updateListById } = useListStore();
  const createUpdateResult = useMutation({
    mutationFn: async (data: any) => {
      if (isUpdate) {
        return await updateListById(id, data);
      } else {
        return await createList(data);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    createUpdateResult.mutate(formValue);
  };

  // update data
  const { id } = useParams();
  const getListByIdResult = useQuery({
    queryKey: ["list", id],
    queryFn: async () => {
      const url = `/list/get-id/${id}`;
      return (await axiosConfig.get(url)).data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (id && isUpdate && getListByIdResult.data?.data) {
      for (const key in formValue) {
        setFormValue((prev) => ({
          ...prev,
          ...(getListByIdResult.data?.data?.[key] && {
            [key]: getListByIdResult.data?.data?.[key],
          }),
        }));
      }
    } else {
      setFormValue((prev) => ({
        ...prev,
        title: "",
        description: "",
      }));
    }
  }, [getListByIdResult.data, id, isUpdate]);

  return (
    <div className="px-4">
      <form onSubmit={onSubmit} method="post" className="flex flex-col gap-4">
        <ReactTextareaAutosize
          placeholder="Title"
          className="w-full resize-none border-none outline-none text-2xl font-medium"
          value={formValue.title}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextEditor
          type="blog"
          placeholder="Write..."
          value={formValue.description || ""}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, description: e }))
          }
          uploadFiles={(e) => {
            setFormValue((prev) => ({ ...prev, imageList: e as any }));
          }}
        />
        <div>
          <button
            disabled={formValue.title ? false : true}
            className="btn btn-success rounded-full"
          >
            {isUpdate ? `Update` : `Create`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ListNewAndUpdatePage;
