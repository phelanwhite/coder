import React, { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { ColumnType, TaskType } from "@/assets/type";

type Type = {
  type: "task" | "column";
  data: TaskType | ColumnType;
  children: React.ReactNode;
};

function SortableItem({ type, data, children }: Type) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data?._id,
    data: {
      type: type,
      data,
    },
  });

  const style = {
    display: "block",
    opacity: isDragging ? 0.5 : undefined,
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(`touch-none `, isDragging && `opacity-50`)}
    >
      {children}
    </li>
  );
}

export default memo(SortableItem);
