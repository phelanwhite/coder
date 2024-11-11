import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuillNew from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.core.css";
import "./style.css";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/services/upload";
import clsx from "clsx";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  theme?: "snow" | "bubble";
  type?: "comment" | "blog";

  uploadFiles?: (files: string[]) => void;
}

const RichEditorReactQuillNew: FC<Props> = ({ ...props }) => {
  // upload to cloudinary
  const [filesUpload, setFilesUpload] = useState<string[]>([]);
  const imageHandler = useCallback(async () => {
    try {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        if (input !== null && input.files !== null) {
          const file = input.files[0];
          const response = await uploadToCloudinary(file);
          setFilesUpload((prev) => [response?.secure_url, ...prev]);

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
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);
  useEffect(() => {
    filesUpload.length && props.uploadFiles && props.uploadFiles(filesUpload);
  }, [filesUpload]);

  const reactQuillRef = useRef<ReactQuillNew | null>(null);

  // options
  const modulesOptions = useMemo(() => {
    if (props.type === "comment")
      return {
        toolbar: {
          container: [
            "bold",
            "italic",
            "underline",
            "strike",
            "code-block",
            "link",
            "image",
            { list: "ordered" },
            { list: "bullet" },
            { list: "check" },
            "clean",
          ],
          handlers: {
            image: imageHandler,
          },
        },
      };
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

  return (
    <div
      className={clsx(
        props.type === "blog" && `rich-editor-ql-blog`,
        props.type === "comment" && `rich-editor-ql-comment`
      )}
    >
      <ReactQuillNew ref={reactQuillRef} modules={modulesOptions} {...props} />
    </div>
  );
};

export default memo(RichEditorReactQuillNew);
