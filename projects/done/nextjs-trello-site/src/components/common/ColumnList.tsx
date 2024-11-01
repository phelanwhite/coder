"use client";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import React, { memo, useState } from "react";
import { createPortal } from "react-dom";
import ColumnCard from "./ColumnCard";
import TaskCard from "./TaskCard";
import SortableItem from "./SortableItem";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useParams } from "next/navigation";
import { useColumnStore } from "@/store/column-store";
import { useTaskStore } from "@/store/task-store";
import { MdAdd } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../feedback/loader";

const ColumnList = () => {
  const { id } = useParams();
  const { columns, createColumn, updateColumns, updatePositionColumns } =
    useColumnStore();
  const { tasks, updateTasks, updatePositionTasks } = useTaskStore();
  const createColumnResult = useMutation({
    mutationFn: async () => {
      const response = await createColumn({
        title: "New Column",
        boardId: id,
      });
      return await response;
    },
    onSuccess: (data) => {
      toast.success("Column created successfully");
    },
    onError: (error) => {
      console.log({ error });

      toast.error("Failed to create column");
    },
  });

  //   Dndkit
  const [activeId, setActiviId] = useState<any | null>(null);
  //   Sensor
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor);
  // handle dndkit
  const onDragStart = (e: DragStartEvent) => {
    setActiviId(e.active);
  };
  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!active || !over || active.id === over.id) return;

    // column x column
    if (
      active.data.current?.type === "column" &&
      over.data.current?.type === "column"
    ) {
      const indexColumnActive = columns.findIndex(
        (item) => item.id === active.id
      );
      const indexColumnOver = columns.findIndex((item) => item.id === over.id);
      const newColumns = arrayMove(columns, indexColumnActive, indexColumnOver);
      updateColumns(newColumns);
    }

    // card x card
    if (
      active.data.current?.type === "card" &&
      over.data.current?.type === "card"
    ) {
      const indexCardActive = tasks.findIndex((item) => item.id === active.id);
      const indexCardOver = tasks.findIndex((item) => item.id === over.id);
      const columnIdActive = active.data.current?.data?.columnId;
      const columnIdOver = over.data.current?.data?.columnId;
      if (columnIdActive === columnIdOver) {
        const newCards = arrayMove(tasks, indexCardActive, indexCardOver);
        updateTasks(newCards);
      } else {
        let newCards = [...tasks];
        newCards[indexCardActive].columnId = columnIdOver;
        updateTasks(newCards);
      }
    }

    // card x column
    if (
      active.data.current?.type === "card" &&
      over.data.current?.type === "column"
    ) {
      const columnActive = columns.find(
        (item) => item.id === active.data?.current?.data?.columnId
      );
      const columnOver = columns.find((item) => item.id === over.id);

      if (!columnOver || !columnActive || columnActive?.id === columnOver.id)
        return;

      const indexCardActive = tasks.findIndex((item) => item.id === active.id);
      let newCards = [...tasks];
      newCards[indexCardActive].columnId = columnOver.id;
      updateTasks(newCards);
    }

    // column x card
    if (
      active.data.current?.type === "column" &&
      over.data.current?.type === "card"
    ) {
      const indexColumnActive = columns.findIndex(
        (item) => item.id === active.id
      );
      const indexColumnOver = columns.findIndex(
        (item) => item.id === over.data?.current?.data?.columnId
      );
      if (!indexColumnActive || !indexColumnOver) return;

      const newColumns = arrayMove(columns, indexColumnActive, indexColumnOver);
      updateColumns(newColumns);
    }
  };
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!active || !over) {
      setActiviId(null);
      return;
    }
    if (activeId?.data?.current?.type?.includes("column")) {
      updatePositionColumns(columns);
    }
    if (activeId?.data?.current?.type?.includes("card")) {
      updatePositionTasks(tasks);
    }
    setActiviId(null);
  };

  if (createColumnResult.isPending) return <Loader />;

  return (
    <>
      <div className="w-full min-h-screen overflow-x-auto p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={columns.map((item) => item?.id)}>
            <ul className="flex gap-4">
              {columns?.map((item) => {
                const tasksByColumnId = tasks?.filter(
                  (card) => card?.columnId === item?.id
                );
                return (
                  <SortableItem key={item?.id} type="column" data={item}>
                    <ColumnCard data={item} tasks={tasksByColumnId} />
                  </SortableItem>
                );
              })}
              <div>
                <button
                  onClick={() => createColumnResult.mutate()}
                  className="bg-white/30 hover:bg-white/40 w-[250px] text-white text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <MdAdd />
                  <span>New Column</span>
                </button>
              </div>
            </ul>
          </SortableContext>
          {createPortal(
            <DragOverlay
              adjustScale={false}
              modifiers={[restrictToWindowEdges]}
            >
              {activeId && activeId?.data?.current?.type?.includes("card") && (
                <TaskCard
                  data={tasks.find((item) => item.id === activeId?.id)}
                />
              )}
              {activeId &&
                activeId?.data?.current?.type?.includes("column") && (
                  <ColumnCard
                    data={columns.find((column) => column.id === activeId?.id)}
                    tasks={tasks.filter(
                      (item) => item.columnId === activeId?.id
                    )}
                  />
                )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
};

export default memo(ColumnList);
