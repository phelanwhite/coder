import { TaskType } from "@/assets/type";
import React, { memo } from "react";
import { FaEye, FaRegComment } from "react-icons/fa";
type Type = {
  task: TaskType;
};
const TaskCard = ({ task }: Type) => {
  return (
    <div className="rounded-lg overflow-hidden bg-[--bg-color-task-card] shadow ">
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
