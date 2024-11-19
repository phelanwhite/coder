import React, { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { HiBars4 } from "react-icons/hi2";
import { PiCreditCardFill } from "react-icons/pi";
import RichEditorReactQuillNew from "@/components/form/react-quill-new";
import { MdDelete, MdPendingActions } from "react-icons/md";
import { useTaskModalStore } from "@/stores/modal-store";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosConfigV1 } from "@/configs/axios-config";
import { useTaskStore } from "@/stores/task-store";
import { useActionStore } from "@/stores/action-store";
import { Link } from "react-router-dom";
import ActionFileItem from "../action/ActionFileItem";
import { useAuthStore } from "@/stores/auth-store";
import { IMAGES_DEFAULT } from "@/constants/images-constant";
import ActionCommentItem from "../action/ActionCommentItem";

let timer: any;
let timeour = 500;

const TaskModal = () => {
  // modal
  const { closeModal, isOpen, idTask } = useTaskModalStore();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  const [isInput, setIsInput] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isInput]);

  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  // user
  const { user } = useAuthStore();

  // actions
  const {
    files,
    uploadFile,
    deleteFile,
    getFilesByTaskId,

    createComment,

    actions,
    getActionsByTaskId,
  } = useActionStore();
  const getActionsByTaskIdResult = useQuery({
    queryKey: ["task", "file", "action", idTask],
    queryFn: async () => {
      const actions = await getActionsByTaskId(idTask);
      const files = await getFilesByTaskId(idTask);
      return {
        actions,
        files,
      };
    },
    enabled: !!(isOpen || idTask),
  });
  const deleteFileResult = useMutation({
    mutationFn: async (fileId: string) => {
      return await deleteFile(fileId);
    },
  });

  // comment
  const [commentInput, setCommentInput] = useState("");
  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    createCommentResult.mutate();
  };
  const createCommentResult = useMutation({
    mutationFn: async () => {
      return await createComment(idTask, commentInput);
    },
    onSuccess() {
      setCommentInput("");
    },
  });

  // task
  const { updateTaskById } = useTaskStore();
  const getTaskByIdResult = useQuery({
    queryKey: ["task", idTask],
    queryFn: async () => {
      const url = `task/get-id/${idTask}`;
      return (await axiosConfigV1.get(url)).data;
    },
    enabled: !!(isOpen || idTask),
  });
  useEffect(() => {
    if (getTaskByIdResult.data) {
      setInputValue(getTaskByIdResult.data.data?.title);
      setDescriptionValue(getTaskByIdResult.data.data?.description);
    }
  }, [getTaskByIdResult.data]);

  if (!isOpen) return null;

  return (
    <div className="z-[999] fixed top-0 left-0 bottom-0 right-0 p-4">
      <div
        onClick={closeModal}
        className="-z-10 bg-black/50 absolute inset-0"
      ></div>
      <div className="space-y-8 relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[800px] w-full bg-[--bg-color-column-card] rounded-lg p-4 h-full overflow-y-auto">
        {/* title  */}
        <div className="flex items-center gap-4">
          <PiCreditCardFill size={20} />
          <div className="font-medium text-base flex-1">
            {isInput ? (
              <TextareaAutosize
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  clearTimeout(timer);
                  timer = setTimeout(() => {
                    updateTaskById(idTask, { title: e.target.value });
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
                {inputValue}
              </div>
            )}
          </div>
        </div>
        {/* description */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <HiBars4 size={18} />
            <div className="font-medium text-base">Description</div>
          </div>
          <RichEditorReactQuillNew
            type="blog"
            value={descriptionValue}
            onChange={(e) => {
              setDescriptionValue(e);
              clearTimeout(timer);
              timer = setTimeout(() => {
                updateTaskById(idTask, { description: e });
              }, timeour);
            }}
          />
        </div>
        {/* attachments */}
        <div>
          {/* title  */}
          <div className="flex justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <GrAttachment size={14} />
              <div className="font-medium text-base">Attachments</div>
            </div>
            <label htmlFor="file">
              <input
                name="file"
                id="file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  uploadFile(idTask, e.target.files?.[0] as File);
                }}
              />
              <span className="cursor-pointer rounded hover:bg-gray-300 text-xs bg-gray-200 px-2 py-1 font-medium">
                Upload
              </span>
            </label>
          </div>
          {/* files  */}
          <div className="space-y-4">
            {files.length === 0 && <div>No attachments found.</div>}
            {files.map((item) => (
              <div key={item?._id} className="flex items-center gap-4 ">
                <div className="w-20 aspect-video border overflow-hidden rounded bg-gray-200">
                  <img src={item?.data?.url} loading="lazy" alt="" />
                </div>

                <div className="flex-1">
                  <div className="line-clamp-1 font-medium break-words overflow-hidden">
                    <a target="_blank" href={item?.data?.url}>
                      {item?.data?.url}
                    </a>
                  </div>
                  <div className="text-xs text-secondary">
                    {new Date(item?.createdAt).toDateString()}
                  </div>
                </div>

                <button
                  onClick={() => deleteFileResult.mutate(item?._id)}
                  className="text-red-500"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* action */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <MdPendingActions size={16} />
            <div className="font-medium text-base">Action</div>
          </div>
          {/* actions  */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 overflow-hidden rounded-full">
                <img
                  src={user?.avatar || IMAGES_DEFAULT.account_notfound}
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className="flex-1 space-y-1">
                <form
                  onSubmit={onSubmit}
                  action=""
                  method="post"
                  className="space-y-2"
                >
                  <RichEditorReactQuillNew
                    type="comment"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e)}
                  />
                  <div>
                    <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-xs text-white">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {actions.map((item) => {
              if (item?.type === "file")
                return <ActionFileItem key={item?._id} data={item} />;
              if (item?.type === "comment")
                return <ActionCommentItem key={item?._id} data={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskModal);
