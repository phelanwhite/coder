"use client";
import Loader from "@/components/feedback/loader";
import { getTaskById } from "@/libs/prisma-query/task";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, FC, memo, useEffect, useState } from "react";

import { GrAttachment } from "react-icons/gr";
import { HiBars4 } from "react-icons/hi2";
import { PiCreditCardFill } from "react-icons/pi";
import ReactTextareaAutosize from "react-textarea-autosize";
import TextEditor from "../text-editor";
import { useTaskStore } from "@/store/task-store";
import { useCommentStore } from "@/store/comment-store";
import CommentForm from "./CommentForm";
import FileForm from "./FileForm";
import { useFileStore } from "@/store/file-store";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { deleteImage } from "@/config/cloudinary-config";
import {
  CommentContextProvider,
  useCommentContext,
} from "@/context/commentContext";
let timer: any;
const timeout = 500;

interface Props {
  id: string;
}

const Form: FC<Props> = ({ id }) => {
  const { setDataEdit, setIsEdit } = useCommentContext();
  const getTaskByIdResult = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await getTaskById(id);
      return response;
    },
  });
  const { updateTaskById } = useTaskStore();
  const { comments, getCommentByTaskId, deleteCommentById } = useCommentStore();
  const { files, getFilesByTaskId, deleteFileById } = useFileStore();
  const getCommentByTaskIdResult = useQuery({
    queryKey: ["getCommentByTaskId", id],
    queryFn: async () => {
      const response = await getCommentByTaskId(id);
      return response;
    },
  });
  const getFilesByTaskIdResult = useQuery({
    queryKey: ["getFilesByCardId", id],
    queryFn: async () => {
      const response = await getFilesByTaskId(id);
      return response;
    },
  });
  const deleteFileByIdResult = useMutation({
    mutationFn: async ({ id, url }: { id: string; url?: string }) => {
      if (url) {
        await deleteImage(url);
      }
      const resp = await deleteFileById(id);
      return resp;
    },
    onSuccess: (data) => {
      toast.success("File deleted!");
    },
    onError: (error) => {
      console.log({ error });
      toast.error("Error deleting file!");
    },
  });
  const deleteCommentByIdResult = useMutation({
    mutationFn: async (id: string) => await deleteCommentById(id),
    onSuccess: (data) => {
      toast.success("Comment deleted successfully!");
    },
    onError: (error) => {
      console.log({ error });
      toast.error("Comment deleted failed!");
    },
  });

  // update form
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (getTaskByIdResult.data) {
      setFormValue({
        title: getTaskByIdResult.data.title,
        description: getTaskByIdResult.data.description as string,
      });
    }
  }, [getTaskByIdResult.data]);

  //   update title
  const updateTitle = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer);
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    timer = setTimeout(() => {
      updateTaskById(id, {
        title: e.target.value,
      });
    }, timeout);
  };

  //   update description
  const updateDescription = async (e: any) => {
    clearTimeout(timer);
    setFormValue((prev) => ({
      ...prev,
      description: e,
    }));
    timer = setTimeout(() => {
      updateTaskById(id, {
        description: e,
      });
    }, timeout);
  };

  if (
    deleteFileByIdResult.isPending ||
    getTaskByIdResult.isLoading ||
    getCommentByTaskIdResult.isLoading ||
    getFilesByTaskIdResult.isLoading
  )
    return <Loader />;
  return (
    <div className="space-y-6 px-4 py-8">
      {/* Title */}
      <div>
        <div className="flex items-start gap-4 text-base font-medium mb-2">
          <PiCreditCardFill />
          <ReactTextareaAutosize
            name="title"
            placeholder="New Card"
            className="flex-1 bg-transparent border-none outline-none resize-none"
            value={formValue.title}
            onChange={updateTitle}
          />
        </div>
      </div>
      {/* Description */}
      <div>
        <div className="flex items-center gap-4 text-base font-medium mb-2">
          <HiBars4 />
          <span>Description</span>
        </div>
        <TextEditor
          className="bg-white"
          value={formValue.description}
          onChange={updateDescription}
        />
      </div>
      {/* Attachments */}
      <div>
        <div className="flex items-center gap-4 text-base font-medium mb-2">
          <GrAttachment />
          <span>Attachments</span>
        </div>
        <div className="space-y-2">
          <FileForm id={id} />
          {files.map((item) => (
            <div key={item?.id} className="flex items-start gap-4">
              <div className="relative aspect-video rounded overflow-hidden w-16">
                <Image fill alt="" src={item?.file} loading="lazy" />
              </div>
              <div className="flex-1">
                <a
                  href={item?.file}
                  target="_blank"
                  className="line-clamp-1 font-medium"
                >
                  {item?.file}
                </a>
                <div className="text-gray-500 text-xs">
                  {new Date(item?.createdAt).toDateString()}
                </div>
              </div>
              <button
                onClick={() =>
                  deleteFileByIdResult.mutate({ id: item?.id, url: item?.file })
                }
                className="text-red-500"
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Actions */}
      <div>
        <div className="flex items-center gap-4 text-base font-medium mb-2">
          <HiBars4 />
          <span>Actions</span>
        </div>
        <div className="space-y-4">
          <CommentForm id={id} />
          {comments.map((item) => (
            <div key={item.id}>
              <div className="w-full block px-4 py-2 rounded-md border bg-white gorup">
                <div className="text-gray-500 text-xs">
                  {new Date(item?.createdAt).toDateString()}
                </div>
                <div>{item?.comment}</div>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs px-2">
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setDataEdit(item);
                  }}
                  className="underline hover:text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCommentByIdResult.mutate(item?.id)}
                  className="underline hover:text-blue-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Form);
