import ColumnCard from "@/components/common/column/ColumnCard";
import { memo, useMemo, useState } from "react";
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
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import SortableItem from "@/components/common/SortableItem";
import { ColumnType, TaskType } from "@/assets/type";
import { useColumnStore } from "@/stores/column-store";
import { useTaskStore } from "@/stores/task-store";
import TaskCard from "../task/TaskCard";
import { MdAdd } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type ItemActiveType = {
  type: "column" | "task";
  data: ColumnType | TaskType | null;
} | null;
const ColumnList = () => {
  const { id } = useParams();
  const { columns, updateColumns, updateColumnsPosition, addColumn } =
    useColumnStore();
  const { tasks, updateTasks, updateTasksPosition } = useTaskStore();
  console.log({
    tasks,
  });

  const [itemActive, setItemActive] = useState<ItemActiveType>(null);

  const addColumnResult = useMutation({
    mutationFn: async () => {
      return await addColumn({
        title: "New Column",
        board: id,
      });
    },
  });

  //   sensor
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  // handle dndkit
  const onDragStart = (e: DragStartEvent) => {
    setItemActive(e.active.data.current as ItemActiveType);
  };
  const onDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!active.id || !over?.id || active?.id === over?.id) return;

    // column x column
    if (
      active.data.current?.type === "column" &&
      over.data.current?.type === "column"
    ) {
      const indexColumnActive = columns.findIndex((i) => i._id === active.id);
      const indexColumnOver = columns.findIndex((i) => i._id === over.id);
      const newColumns = arrayMove(columns, indexColumnActive, indexColumnOver);
      updateColumns(newColumns);
    }

    // task x task
    if (
      active.data.current?.type === "task" &&
      over.data.current?.type === "task"
    ) {
      const indexTaskActive = tasks.findIndex((i) => i._id === active.id);
      const indexTaskOver = tasks.findIndex((i) => i._id === over.id);
      const columnIdActive = active.data.current?.data?.column;
      const columnIdOver = over.data.current?.data?.column;

      // same column
      if (columnIdActive === columnIdOver) {
        const newTasks = arrayMove(tasks, indexTaskActive, indexTaskOver);
        updateTasks(newTasks);
      } else {
        const newTasks = tasks.map((i, index) =>
          index === indexTaskActive ? { ...i, column: columnIdOver } : i
        );
        updateTasks(newTasks);
      }
    }

    // task x column
    if (
      active.data.current?.type === "task" &&
      over.data.current?.type === "column"
    ) {
      const columnActive = columns.find(
        (i) => i._id === active.data.current?.data?.column
      );
      const columnOver = columns.find((i) => i._id === over.id);
      if (!columnOver || !columnActive || columnActive._id === columnOver._id)
        return;

      const indexTaskActive = tasks.findIndex((i) => i._id === active.id);
      const newTasks = tasks;
      newTasks[indexTaskActive].column = columnOver._id;
      updateTasks(newTasks);
    }

    // column x task
    if (
      active.data.current?.type === "column" &&
      over.data.current?.type === "task"
    ) {
      const indexColumnActive = columns.findIndex((i) => i._id === active.id);
      const indexCloumnOver = tasks.findIndex(
        (i) => i._id === over.data.current?.data?.column
      );
      if (!indexColumnActive || !indexCloumnOver) return;

      const newColumns = arrayMove(columns, indexColumnActive, indexCloumnOver);
      updateColumns(newColumns);
    }
  };
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!active || !over) {
      setItemActive(null);
      return;
    }
    if (!itemActive) return;
    if (itemActive.type === "column") {
      updateColumnsPosition(columns);
    }
    if (itemActive.type === "task") {
      updateTasksPosition(tasks);
    }

    setItemActive(null);
  };

  return (
    <ul className="flex gap-3 items-start">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={columns.map((c) => c._id)}>
          {columns.map((c) => {
            const taskInColumn = tasks.filter((t) => t.column === c._id);
            return (
              <SortableItem key={c._id} data={c} type="column">
                <ColumnCard column={c} tasks={taskInColumn} />
              </SortableItem>
            );
          })}
        </SortableContext>
        <DragOverlay adjustScale={false} modifiers={[restrictToWindowEdges]}>
          {itemActive && itemActive.type === "column" && (
            <ColumnCard
              column={itemActive.data as ColumnType}
              tasks={tasks.filter((t) => t.column === itemActive.data?._id)}
            />
          )}
          {itemActive && itemActive.type === "task" && (
            <TaskCard task={itemActive.data as TaskType} />
          )}
        </DragOverlay>
      </DndContext>
      <button
        onClick={() => addColumnResult.mutate()}
        className="px-3 py-2 flex items-center gap-2 hover:bg-gray-300 font-medium min-w-[280px] bg-[--bg-color-column-card] rounded-lg shadow"
      >
        <MdAdd /> <span>Add column</span>
      </button>
    </ul>
  );
};

export default memo(ColumnList);
