import React, { memo, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import TaskCard from "../task/TaskCard";
import { ColumnType, TaskType } from "@/assets/type";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "../SortableItem";
import { useTaskStore } from "@/stores/task-store";
import { useMutation } from "@tanstack/react-query";
import TextareaAutosize from "react-textarea-autosize";
import { useColumnStore } from "@/stores/column-store";

type Type = {
  column: ColumnType;
  tasks: TaskType[];
};

let timer: any;
let timeour = 500;

const ColumnCard = ({ column, tasks }: Type) => {
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState(column.title);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isInput]);

  const { updateColumnById } = useColumnStore();
  const { addTask } = useTaskStore();
  const addTaskResult = useMutation({
    mutationFn: async () => {
      return await addTask({
        title: "New Task",
        column: column._id,
      });
    },
  });
  return (
    <div className="px-1.5 w-[280px] bg-[--bg-color-column-card] p-2 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="mb-2 font-medium flex-1">
          {isInput ? (
            <TextareaAutosize
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                clearTimeout(timer);
                timer = setTimeout(() => {
                  updateColumnById(column._id, { title: e.target.value });
                }, timeour);
              }}
              onBlur={() => {
                setIsInput(false);
              }}
              className="w-full py-1 px-2 outline-blue-500"
            />
          ) : (
            <div
              onClick={() => {
                setIsInput(true);
              }}
            >
              {column?.title}
            </div>
          )}
        </div>
      </div>
      <ul className="space-y-2">
        <SortableContext items={tasks.map((t) => t._id)}>
          {tasks.map((t) => {
            return (
              <SortableItem key={t._id} data={t} type="task">
                <TaskCard task={t} />
              </SortableItem>
            );
          })}
        </SortableContext>

        <li>
          <button
            onClick={() => addTaskResult.mutate()}
            className="px-3 py-2 rounded w-full flex items-center gap-2 hover:bg-gray-300 font-medium"
          >
            <MdAdd /> <span>Add task</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default memo(ColumnCard);
