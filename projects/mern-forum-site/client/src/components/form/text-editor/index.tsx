import React, { FC, memo, useEffect, useMemo, useRef } from "react";
import "./style.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface ReactQuillProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Quill: FC<ReactQuillProps> = ({ ...props }) => {
  const toolbarOptions = useMemo(() => {
    return [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ];
  }, []);
  return (
    <ReactQuill
      theme="snow"
      modules={{
        toolbar: toolbarOptions,
      }}
      {...props}
    />
  );
};

export default memo(Quill);
