import { useTaskStore } from "@/store/task-store";
import { useMutation } from "@tanstack/react-query";
import React, { FC, memo } from "react";
import toast from "react-hot-toast";
import Loader from "../feedback/loader";
import { MdDelete, MdOutlineModeComment } from "react-icons/md";
import { HiBars4 } from "react-icons/hi2";
import { GrAttachment } from "react-icons/gr";
import { useModalTaskForm } from "../form/task-form";
import Image from "next/image";
interface Props {
  data: any;
}
const TaskCard: FC<Props> = ({ data }) => {
  const { handleOpen } = useModalTaskForm();
  const { deleteTaskById } = useTaskStore();
  const deleteTaskByIdResult = useMutation({
    mutationFn: async () => {
      const resp = await deleteTaskById(data?.id);
      return resp;
    },
    onSuccess: (data) => {
      toast.success(`Task deleted successfully!`);
    },
    onError: (error) => {
      console.log({ error });
      toast.error(`Failed to delete task!`);
    },
  });
  if (deleteTaskByIdResult.isPending) return <Loader />;
  return (
    <div className="relative block bg-bg-item-card rounded-lg overflow-hidden shadow group hover:border-blue-500 border-2">
      <button
        className="z-10 absolute top-2 right-3 hidden group-hover:block p-1.5 rounded-full bg-bg-item-card hover:bg-gray-200"
        onClick={() => deleteTaskByIdResult.mutate()}
      >
        <MdDelete className="text-red-500" />
      </button>
      {data?.files?.length > 0 && (
        <div
          onClick={() => {
            handleOpen(data.id);
          }}
          className="relative aspect-video"
        >
          <Image fill alt="" src={data?.files?.[0]?.file} loading="lazy" />
        </div>
      )}
      <div
        onClick={() => {
          handleOpen(data.id);
        }}
        className="px-3 py-2"
      >
        <div className="">{data?.title}</div>
        {(data?.description ||
          data?.comments?.length > 0 ||
          data?.files?.length > 0) && (
          <div className="mt-2 text-xs flex items-center gap-3">
            {data?.description && <HiBars4 />}
            {data?.comments?.length > 0 && (
              <span className="flex items-center gap-1">
                <MdOutlineModeComment />
                {data?.comments?.length}
              </span>
            )}
            {data?.files?.length > 0 && (
              <span className="flex items-center gap-1">
                <GrAttachment />
                {data?.files?.length}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TaskCard);
