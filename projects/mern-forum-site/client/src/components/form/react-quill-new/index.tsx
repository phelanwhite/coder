import clsx from "clsx";
import { uploadImagesToCloud } from "@/services/upload-cloud";
import { FC, memo, useCallback, useMemo, useRef } from "react";
import ReactQuillNew from "react-quill-new";
import "./style.css";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  theme?: "snow" | "bubble";
  type?: "comment" | "blog";

  uploadFiles?: string[];
  onchangeUploadFiles?: (files: string[]) => void;
}

const RichEditorReactQuillNew: FC<Props> = (props) => {
  const reactQuillNewRef = useRef<ReactQuillNew | null>(null);

  const imageHandler = useCallback(async () => {
    try {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.setAttribute("multiple", "true");
      input.click();
      input.onchange = async () => {
        if (input !== null && input.files !== null) {
          const files = input.files;
          const response = await uploadImagesToCloud(files);

          props.uploadFiles?.push(response?.data);

          console.log({
            uploadFiles: props.uploadFiles?.flat(1),
          });

          const quill = reactQuillNewRef.current;

          if (quill && response.data?.length) {
            const range = quill.getEditorSelection();
            for (const element of response.data) {
              range &&
                quill
                  .getEditor()
                  .insertEmbed(range.index, "image", element?.secure_url);
            }
          }
        }
      };
    } catch (error: any) {
      console.error(error.message);
    }
  }, []);
  // options
  const modulesOptionsComment = useMemo(() => {
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
  }, []);
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

  return (
    <div
      className={clsx(
        props.type === "blog" && `rich-editor-ql-blog`,
        props.type === "comment" && `rich-editor-ql-comment`
      )}
    >
      <ReactQuillNew
        ref={reactQuillNewRef}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        theme={props.theme}
        modules={
          props.type === "comment" ? modulesOptionsComment : modulesOptions
        }
      />
    </div>
  );
};

export default memo(RichEditorReactQuillNew);
