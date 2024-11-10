import React, {
  FC,
  LegacyRef,
  memo,
  useCallback,
  useMemo,
  useRef,
} from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import "./style.css";
import { uploadToCloudinary } from "@/services/upload";

const RichEditorReactQuill: FC<ReactQuillProps> = ({ ...props }) => {
  const imageHandler = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const response = await uploadToCloudinary(file);

        const quill = reactQuillRef.current;

        if (quill) {
          const range = quill.getEditorSelection();
          range &&
            quill
              .getEditor()
              .insertEmbed(range.index, "image", response?.secure_url);
        }
      }
    };
  }, []);

  const reactQuillRef = useRef<ReactQuill | null>(null);

  const modulesOptions = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],
          ["link", "image", "video", "formula"],

          // [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ["clean"], // remove formatting button
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return <ReactQuill ref={reactQuillRef} modules={modulesOptions} {...props} />;
};

export default memo(RichEditorReactQuill);
