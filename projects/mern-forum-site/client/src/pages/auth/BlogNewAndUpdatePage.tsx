import ReactTextareaAutosize from "react-textarea-autosize";
import TextEditor from "@/components/form/text-editor";
import { useEffect, useState } from "react";
import { getDateTimeLocalToString } from "@/libs/utils/time";
import BlogPreview from "@/components/common/blog/BlogPreview";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosConfig from "@/configs/axios-config";

const BlogNewAndUpdatePage = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    description: "",
    topic: [] as string[],
    thumbnail: "",
    status: false,
    imageList: [],
    article_origin: "",
    publication_time: getDateTimeLocalToString(new Date()),
  });

  const { id } = useParams();
  const getBlogByIdResult = useQuery({
    queryKey: ["blog", "id", id],
    queryFn: async () => {
      const url = `/blog/get-id/${id}`;
      return (await axiosConfig.get(url)).data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (id && getBlogByIdResult.data?.data) {
      for (const key in formValue) {
        setFormValue((prev) => ({
          ...prev,
          ...(getBlogByIdResult.data?.data?.[key] && {
            [key]: getBlogByIdResult.data?.data?.[key],
          }),
        }));
      }
    }
  }, [getBlogByIdResult.data, id]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="px-4">
        <div className="flex flex-col gap-4">
          <ReactTextareaAutosize
            placeholder="Title"
            className="w-full resize-none border-none outline-none text-2xl font-medium"
            value={formValue.title}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <TextEditor
            type="blog"
            placeholder="Write..."
            value={formValue.description || ""}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, description: e }))
            }
            uploadFiles={(e) => {
              setFormValue((prev) => ({ ...prev, imageList: e as any }));
            }}
          />
          <div>
            <button
              disabled={formValue.title ? false : true}
              onClick={() => setIsOpen(true)}
              className="btn btn-success rounded-full"
            >
              Done
            </button>
          </div>
        </div>
      </div>
      <BlogPreview
        isOpen={isOpen}
        data={formValue}
        setData={setFormValue}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default BlogNewAndUpdatePage;
