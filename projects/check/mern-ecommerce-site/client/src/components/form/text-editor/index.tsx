import { FC, memo, useEffect, useMemo, useRef } from "react";
import "./style.css";
import ReactQuill, { ReactQuillProps } from "react-quill";
import clsx from "clsx";

interface Props extends ReactQuillProps {
  label?: string;
  name?: string;
  required?: boolean;
}

const Quill: FC<Props> = ({ label, name, required, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    // input.select();
  }, []);
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
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className={clsx(`capitalize`)}>
          {required && "*"} {label}
        </label>
      )}
      <ReactQuill
        ref={inputRef}
        theme="snow"
        modules={{
          toolbar: toolbarOptions,
        }}
        {...props}
      />
    </div>
  );
};

export default memo(Quill);
