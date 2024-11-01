"use client";
import ColumnList from "@/components/common/ColumnList";
import Loader from "@/components/feedback/loader";
import { useColumnStore } from "@/store/column-store";
import { useTaskStore } from "@/store/task-store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import ModalTaskForm, { useModalTaskForm } from "@/components/form/task-form";
import { useFileStore } from "@/store/file-store";
import { useCommentStore } from "@/store/comment-store";
import ReactTextareaAutosize from "react-textarea-autosize";
import { getBoardById } from "@/libs/prisma-query/board";
import { useBoardStore } from "@/store/board-store";
import { CommentContextProvider } from "@/context/commentContext";

let timer: any;
const timeout = 500;

const BoardByIdPage = () => {
  const { id } = useParams();
  const { updateBoardById } = useBoardStore();
  const { getColumnsByBoardId } = useColumnStore();
  const { getTasksByBoardId } = useTaskStore();
  const { files } = useFileStore();
  const { comments } = useCommentStore();
  const { id: taskId, handleClose, isOpen } = useModalTaskForm();

  const getBoardByBoardIdResult = useQuery({
    queryKey: ["board", id],
    queryFn: async () => {
      const resp = await getBoardById(id as string);
      return resp;
    },
  });
  const getColumnsByBoardIdResult = useQuery({
    queryKey: ["columns", id],
    queryFn: async () => {
      const resp = await getColumnsByBoardId(id as string);
      return resp;
    },
  });
  const getTasksByBoardIdResult = useQuery({
    queryKey: ["cards", files, comments, id],
    queryFn: async () => {
      const resp = await getTasksByBoardId(id as string);
      return resp;
    },
  });

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
  });
  const updateFormValue = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer);
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    timer = setTimeout(() => {
      if (e.target.name === "title" && !e.target.value) return;
      updateBoardById(id as string, { [e.target.name]: e.target.value });
    }, timeout);
  };
  useEffect(() => {
    if (getBoardByBoardIdResult.data) {
      setFormValue({
        title: getBoardByBoardIdResult.data.title,
        description: getBoardByBoardIdResult.data.description as string,
      });
    }
  }, [getBoardByBoardIdResult.data]);

  if (getColumnsByBoardIdResult.isLoading || getTasksByBoardIdResult.isLoading)
    return <Loader />;
  return (
    <>
      <CommentContextProvider>
        <ModalTaskForm id={taskId} isOpen={isOpen} onClose={handleClose} />
      </CommentContextProvider>
      <div className="bg-bg-board">
        <div className="bg-[rgb(0,92,145)] px-3 py-2">
          <ReactTextareaAutosize
            name="title"
            value={formValue.title || ""}
            onChange={updateFormValue}
            placeholder="Add title..."
            className="mb-1 text-base border-none outline-none bg-transparent resize-none font-medium text-white w-full px-4 h-auto"
          />
          <ReactTextareaAutosize
            name="description"
            value={formValue.description || ""}
            onChange={updateFormValue}
            placeholder="Add Description..."
            className="border-none outline-none bg-transparent resize-none font-medium text-white w-full px-4 h-auto"
          />
        </div>
        <div>
          <ColumnList />
        </div>
      </div>
    </>
  );
};

export default BoardByIdPage;
