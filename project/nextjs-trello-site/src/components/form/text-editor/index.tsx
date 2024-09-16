import { FC, memo, useMemo, useRef } from "react";
import "./style.css";
import ReactQuill, { ReactQuillProps } from "react-quill";

const TextEditor: FC<ReactQuillProps> = ({ ...props }) => {
  const inputRef = useRef(null);
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
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ];
  }, []);
  return (
    <ReactQuill
      ref={inputRef}
      theme="snow"
      modules={{
        toolbar: toolbarOptions,
      }}
      {...props}
    />
  );
};

export default memo(TextEditor);
