import React, { FC, memo } from "react";
import ReactQuill, { Quill, ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
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

interface ITextEditor extends ReactQuillProps {}

const TextEditor: FC<ITextEditor> = ({ ...props }) => {
  // const quill = new Quill("#editor",{
  //   modules:{toolbar:toolbarOptions},
  //   theme:"snow"
  // })
  return (
    <div>
      <ReactQuill
        modules={{
          toolbar: toolbarOptions,
        }}
        theme="snow"
        {...props}
      />
    </div>
  );
};

export default memo(TextEditor);
