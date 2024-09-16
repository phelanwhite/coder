"use client";
import { useColumnStore } from "@/store/column-store";
import { useTaskStore } from "@/store/task-store";
import { useMutation } from "@tanstack/react-query";
import React, {
  ChangeEvent,
  FC,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import Loader from "../feedback/loader";
import ReactTextareaAutosize from "react-textarea-autosize";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import TaskCard from "./TaskCard";
import { MdAdd, MdDelete } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
let timer: any;
const timeout = 500;

interface Props {
  data: any;
  tasks: any[];
}
const ColumnCard: FC<Props> = ({ data, tasks }) => {
  const { createTask } = useTaskStore();
  const createTaskResult = useMutation({
    mutationFn: async () => {
      const response = await createTask({
        title: "New Card",
        columnId: data?.id,
      });
      return await response;
    },
    onSuccess: (data) => {
      toast.success("Task created successfully!");
    },
    onError: (error) => {
      console.log({ error });

      toast.error("Failed to create task!");
    },
  });

  const [formValue, setFormValue] = useState({
    title: "",
  });
  useEffect(() => {
    if (data) {
      setFormValue({
        title: data.title,
      });
    }
  }, [data]);
  const { updateColumnById } = useColumnStore();
  const updateFormValue = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer);
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    timer = setTimeout(() => {
      updateColumnById(data?.id, { [e.target.name]: e.target.value });
    }, timeout);
  };

  if (createTaskResult.isPending) return <Loader />;
  return (
    <div className="p-2 rounded-lg bg-bg-item-column block w-[250px]">
      <div className="py-2 px-2 flex gap-4 items-start relative">
        <ReactTextareaAutosize
          name="title"
          value={formValue.title || ""}
          onChange={updateFormValue}
          placeholder="Add title..."
          className="border-none outline-none bg-transparent resize-none font-medium w-full"
        />
        <ColumnOptions id={data.id} />
      </div>
      <ul className="space-y-2">
        <SortableContext items={tasks.map((item) => item.id)}>
          {tasks.map((item) => (
            <SortableItem key={item?.id} type="card" data={item}>
              <TaskCard data={item} />
            </SortableItem>
          ))}
        </SortableContext>

        <button
          onClick={() => createTaskResult.mutate()}
          className="px-3 py-2 flex items-center gap-2 text-xs w-full hover:bg-gray-300 rounded-lg font-medium"
        >
          <MdAdd />
          New Task
        </button>
      </ul>
    </div>
  );
};

export default memo(ColumnCard);

const ColumnOptions = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const { deleteColumnById } = useColumnStore();
  const deleteColumnByIdResult = useMutation({
    mutationFn: async () => {
      const resp = await deleteColumnById(id);
      return resp;
    },
    onSuccess: (data) => {
      toast.success("Column deleted successfully!");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(`Column deleted failed!`);
    },
  });
  if (deleteColumnByIdResult.isPending) return <Loader />;
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md hover:bg-gray-200"
      >
        <HiOutlineDotsHorizontal />
      </button>
      {isOpen && (
        <div className="z-10 absolute top-0 right-0 bg-white rounded-lg shadow py-1 w-[200px]">
          <button
            onClick={() => deleteColumnByIdResult.mutate()}
            className="flex items-center gap-2 w-full text-left p-2 text-sm hover:bg-gray-100"
          >
            <MdDelete /> <span className="">Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};
