import React, { memo } from "react";
import { GrAttachment } from "react-icons/gr";
import { HiBars4 } from "react-icons/hi2";
import { PiCreditCardFill } from "react-icons/pi";
import RichEditorReactQuillNew from "@/components/form/react-quill-new";
import { MdPendingActions } from "react-icons/md";

const TaskForm = () => {
  return (
    <div className="z-[999] fixed top-0 left-0 bottom-0 right-0 p-4 overflow-auto">
      <div className="-z-10 bg-black/50 absolute inset-0"></div>
      <div className="space-y-4 relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-[800px] w-full bg-[--bg-color-column-card] rounded-lg p-4 ">
        {/* title  */}
        <div className="flex items-center gap-4">
          <PiCreditCardFill size={20} />
          <div>phelanwhite đã thêm thẻ này vào danh sách da</div>
        </div>
        {/* description */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <HiBars4 size={18} />
            <div className="font-medium text-base">Description</div>
          </div>
          <RichEditorReactQuillNew type="comment" />
        </div>
        {/* attachments */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <GrAttachment size={14} />
            <div className="font-medium text-base">Attachments</div>
          </div>
          <div>
            <div className="flex items-center gap-4 ">
              <div className="w-20 aspect-video border overflow-hidden rounded bg-gray-200">
                <img
                  src="https://trello.com/1/cards/673b00c86b2fa97c9ff09206/attachments/673b1163b2cc59185de76b24/previews/preview2x/download/78e428fdd90408587181005f5cc3de32.png.webp"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className="flex-1">
                <div className="line-clamp-1 font-medium break-words overflow-hidden">
                  2x/download/78e428fdd90408587181005f5cc3de32.png.webp
                </div>
                <div className="text-xs text-secondary">
                  {new Date().toDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* action */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <MdPendingActions size={16} />
            <div className="font-medium text-base">Action</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <img
                src="https://lh3.google.com/u/0/ogw/AF2bZyiLojhC8p9TsQRRgPLyqXFJ7Cb0iFl5A7qlOAm8QhAHqA=s32-c-mo"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="flex-1 space-y-1">
              {/* user  */}
              <div className="space-x-2">
                <span className="font-medium">Phelan white</span>
                <span className="text-xs text-secondary">
                  {new Date().toDateString()}
                </span>
              </div>
              {/*  */}
              <div className="ql-snow shadow bg-white rounded-lg">
                <div className="ql-editor w-full px-3 py-1.5">Good!</div>
              </div>
              {/* action  */}
              <div className="space-x-2 text-xs">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskForm);
