import React, { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { HiBars4 } from "react-icons/hi2";
import { PiCreditCardFill } from "react-icons/pi";
import RichEditorReactQuillNew from "@/components/form/react-quill-new";
import { MdClose, MdDelete, MdPendingActions } from "react-icons/md";
import { useTaskModalStore } from "@/components/common/task/task-modal/modal-store";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosConfigV1 } from "@/configs/axios-config";
import { useTaskStore } from "@/stores/task-store";
import { useActionStore } from "@/stores/action-store";
import ActionCommentList from "../../action/ActionCommentList";

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

  // actions
  const {
    files,
    uploadFile,
    deleteFile,
    getFilesByTaskId,
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
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <PiCreditCardFill size={20} className="mt-1" />
            <div className="font-medium text-base flex-1">
              {isInput ? (
                <TextareaAutosize
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                      e.target.value !== "" &&
                        updateTaskById(idTask, {
                          title: e.target.value.trim(),
                        });
                    }, timeour);
                  }}
                  onBlur={() => {
                    setIsInput(false);
                  }}
                  className="w-full py-1 px-2 outline-blue-500"
                />
              ) : (
                <div
                  className="flex-1 py-1 px-2"
                  onClick={() => {
                    setIsInput(true);
                  }}
                >
                  {inputValue}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={closeModal}
            className="cursor-pointer hover:bg-gray-300 bg-gray-200 p-2 text-base rounded-full font-medium"
          >
            <MdClose />
          </button>
        </div>

        {/* main  */}
        <div className=" flex items-start gap-8">
          {/* left  */}
          <div className="space-y-8 flex-1">
            {/* description */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <HiBars4 size={20} />
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
                  <GrAttachment size={16} />
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

                    <div className="flex-1 break-words">
                      <a
                        target="_blank"
                        href={item?.data?.url}
                        className="line-clamp-1 flex-1 font-medium break-words"
                      >
                        {item?.data?.url}
                      </a>
                      <div className=" font-medium break-words overflow-hidden"></div>
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
                <MdPendingActions size={18} />
                <div className="font-medium text-base">Action</div>
              </div>
              {/* actions  */}
              <ActionCommentList idTask={idTask} />
            </div>
          </div>
          {/* right  */}
          <div className="max-w-40 w-full">
            <button className="w-full flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
              <MdDelete />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskModal);
