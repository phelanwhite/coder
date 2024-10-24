import Loader from "@/components/layouts/loader";
import axiosConfig from "@/configs/axios-config";
import { useListStore } from "@/stores/library-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  idEdit?: string;
}

const CreateAndUpdateListForm: FC<Props> = ({
  isOpen,
  onClose,
  idEdit,
  isEdit,
}) => {
  const { createList, updateListById } = useListStore();
  const createAndUpdateListResult = useMutation({
    mutationFn: async () => {
      if (isEdit) {
        const response = await updateListById(idEdit, formValue);
        return response;
      } else {
        const response = await createList(formValue);
        return response;
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setFormValue({
        title: "",
        description: "",
        status: true,
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAndUpdateListResult.mutate();
    onClose();
  };
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    status: true,
  });

  const getListByIdResult = useQuery({
    queryKey: ["list", idEdit],
    queryFn: async () => {
      const url = `list/get-id/${idEdit}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    enabled: isEdit || false,
  });
  useEffect(() => {
    if (isEdit && idEdit && getListByIdResult.data) {
      for (const key in formValue) {
        setFormValue((prev) => ({
          ...prev,
          [key]: getListByIdResult.data?.data?.[key],
        }));
      }
    }
  }, [isEdit, getListByIdResult.data]);

  if (getListByIdResult.isLoading || createAndUpdateListResult.isPending)
    return <Loader />;
  if (!isOpen) return;
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute top-0 left-0 bottom-0 right-0 -z-10"
      ></div>
      <div className="max-w-[900px] relative py-10 px-8 w-full shadow border rounded-lg bg-white flex items-center justify-center">
        <button onClick={onClose} className="absolute top-4 right-4">
          <MdClose size={24} />
        </button>
        <div className="max-w-[400px] w-full">
          <form
            onSubmit={handleSubmit}
            action=""
            method="post"
            className="space-y-8"
          >
            <div className="title">Create new list</div>
            <input
              required
              value={formValue.title || ""}
              onChange={(e) =>
                setFormValue((prev) => ({ ...prev, title: e.target.value }))
              }
              name="title"
              id="title"
              type="text"
              placeholder="Title..."
              className="input-field"
            />
            <textarea
              value={formValue.description || ""}
              onChange={(e) =>
                setFormValue((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              name="description"
              id="description"
              placeholder="Description..."
              className="input-field"
            />
            <label htmlFor="status" className="flex items-center gap-2">
              <input
                checked={!formValue.status}
                onChange={(e) =>
                  setFormValue((prev) => ({
                    ...prev,
                    status: !formValue.status,
                  }))
                }
                name="status"
                id="status"
                type="checkbox"
              />
              Make it private
            </label>

            <div>
              <button type="submit" className="btn-success text-xs">
                {isEdit ? `Update` : `Create`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(CreateAndUpdateListForm);
