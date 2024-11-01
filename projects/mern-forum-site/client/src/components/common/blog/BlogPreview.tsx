import { useBlogStore } from "@/stores/blog-store";
import { useMutation } from "@tanstack/react-query";
import { FC, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import ReactTextareaAutosize from "react-textarea-autosize";
import TopicInput from "../topic/TopicInput";
import Loader from "../loader";
import { useLocation, useParams } from "react-router-dom";
import axiosConfig from "@/configs/axios-config";

interface BlogPreviewProp {
  data: any;
  setData: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
}
const BlogPreview: FC<BlogPreviewProp> = ({
  isOpen,
  data,
  setData,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const { id } = useParams();
  const location = useLocation();
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    location.pathname.includes(`update-blog`)
      ? setIsUpdate(true)
      : setIsUpdate(false);
  }, [location.pathname]);

  const [file, setFile] = useState<File | null>(null);
  const { createBlog, updateBlogById } = useBlogStore();

  const createUpdateBlogResult = useMutation({
    mutationFn: async (status: boolean) => {
      const formData = new FormData();
      Object.entries(data).forEach((item) => {
        if (Array.isArray(item[1])) {
          item[1].forEach((value) => {
            formData.append(item[0], value);
          });
        } else {
          formData.append(item[0], item[1] as string);
        }
      });
      if (file) {
        formData.append("file", file);
      }
      formData.set(`status`, status as unknown as string);
      console.log(Array.from(formData));

      if (isUpdate) {
        return await updateBlogById(id, formData);
      } else {
        return await createBlog(formData);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const createTopicResult = useMutation({
    mutationFn: async (data) => {
      const url = `topic/create-many`;
      return await axiosConfig.post(url, {
        topics: data,
      });
    },
  });

  // create topic
  useEffect(() => {
    if (
      createUpdateBlogResult.data?.data?.topic?.length &&
      createUpdateBlogResult.isSuccess
    ) {
      (async () => {
        createTopicResult.mutate(createUpdateBlogResult?.data?.data?.topic);
      })();
    }
  }, [createUpdateBlogResult.data]);

  if (createUpdateBlogResult.isPending) return <Loader />;

  if (!isOpen) return <></>;
  return (
    <div className="z-50 fixed top-0 left-0 bottom-0 right-0 bg-black/40 transition p-3 flex items-center justify-center ">
      <div
        onClick={onClose}
        className="absolute top-0 left-0 bottom-0 right-0"
      ></div>
      <div className="relative z-10 p-8 rounded-xl bg-white shadow max-w-[1320px] max-h-full overflow-y-auto">
        <button
          onClick={onClose}
          className="z-10 absolute top-4 right-4 bg-gray-100 text-xl rounded-full p-1"
        >
          <MdClose />
        </button>
        <div className="mb-4 font-medium">Preview</div>
        <div className="grid gap-6 md:gap-20 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <label htmlFor="file" className="cursor-pointer">
              {file || data?.thumbnail ? (
                <div className="aspect-video">
                  <img
                    src={file ? URL.createObjectURL(file) : data?.thumbnail}
                    alt=""
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="p-8 bg-gray-50 rounded text-center text-sm h-[200px] flex items-center justify-center ">
                  Drag and drop photos here or click to select photos
                </div>
              )}
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] as File)}
              />
            </label>
            <ReactTextareaAutosize
              placeholder="Title"
              className="w-full resize-none pb-1 outline-none border-b font-medium "
              value={data.title}
              onChange={(e) =>
                setData((prev: any) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <ReactTextareaAutosize
              placeholder="Content"
              className="w-full resize-none pb-1 outline-none border-b text-sm"
              value={data.content}
              onChange={(e) =>
                setData((prev: any) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
            />
            <div className="text-[0.8125rem] text-text-secondary-color-2">
              <span className="font-medium">Note: </span>
              <span>
                The editing here does not affect the article content but only
                changes the way the article is displayed on PL's Blog page and
                on search engines like Google.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <TopicInput
              listData={data?.topic}
              setListData={(data) =>
                setData((prev: any) => ({
                  ...prev,
                  topic: data,
                }))
              }
            />
            <div className="text-text-secondary-color-2">
              <div className="text-[0.8125rem] mb-1">Publication time:</div>
              <div>
                <input
                  className="w-full border-b pb-1 outline-none"
                  type="datetime-local"
                  value={data?.publication_time}
                  onChange={(e) =>
                    setData((prev: any) => ({
                      ...prev,
                      publication_time: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="text-[0.8125rem] text-text-secondary-color-2">
              <span className="font-medium">Note: </span>
              <span>
                This article will be automatically posted at the time specified
                above.
              </span>
            </div>
            <div className="flex gap-2">
              <button
                disabled={data.title ? false : true}
                onClick={() => createUpdateBlogResult.mutate(true)}
                className="btn btn-success rounded-full text-xs"
              >
                Published
              </button>
              <button
                disabled={data.title ? false : true}
                onClick={() => createUpdateBlogResult.mutate(false)}
                className="btn btn-success rounded-full text-xs"
              >
                Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BlogPreview);
