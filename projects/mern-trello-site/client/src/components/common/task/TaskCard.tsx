import { TaskType } from "@/assets/type";
import { useTaskModalStore } from "@/components/common/task/task-modal/modal-store";
import React, { memo } from "react";
import { FaEye, FaRegComment } from "react-icons/fa";
type Type = {
  task: TaskType;
};
const TaskCard = ({ task }: Type) => {
  const { openModal } = useTaskModalStore();
  return (
    <div
      onClick={() => openModal(task._id)}
      className="rounded-lg overflow-hidden bg-[--bg-color-task-card] shadow-sm border-2 hover:border-blue-500"
    >
      {task.files?.length && (
        <div className="aspect-video">
          <img src={task.files?.[0]} loading="lazy" alt="" />
        </div>
      )}
      <div className="px-3 py-2 space-y-2">
        <div>{task.title}</div>
        <div className="flex items-center gap-3">
          <span>
            <FaEye />
          </span>
          <span>
            <FaRegComment />
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskCard);
