"use client";
import React, { FC, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

interface Props {
  type: "card" | "column";
  data: any;
  children: React.ReactNode;
}

const SortableItem: FC<Props> = ({ type, data, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data?.id,
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
      className={clsx(`touch-none`, isDragging && `opacity-50`)}
    >
      {children}
    </li>
  );
};
export default memo(SortableItem);
