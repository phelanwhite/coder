import { images } from "@/assets/constants";
import TopicInput from "@/components/commons/TopicInput";
import TextEditor from "@/components/forms/text-editor";
import Loader from "@/components/layouts/loader";
import axiosConfig from "@/configs/axios-config";
import { useAuthStore } from "@/stores/auth-store";
import { useBlogStore } from "@/stores/blog-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose, MdUpload } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";

const CreateUpdateBlogPage = () => {
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes(`update`)) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [location.pathname]);

  const getBlogByIdResult = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const url = `blog/get-id/${id}`;
      const response = (await axiosConfig.get(url)).data;
      return response;
    },
    enabled: isUpdate,
  });

  const { createBlog, updateBlogById } = useBlogStore();
  const { user } = useAuthStore();
  const createAndUpdateBlogResult = useMutation({
    mutationFn: async (data: any) => {
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

      if (isUpdate) {
        const response = await updateBlogById(id, formData);
        return response;
      } else {
        const response = await createBlog(formData);
        return response;
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const [formValue, setFormValue] = useState({
    title: "",
    content: "",
    description: "",
    topic: [] as string[],
    thumbnail: "",
    status: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isUpdate && getBlogByIdResult.data?.data) {
      for (const key in formValue) {
        setFormValue((prev) => ({
          ...prev,
          [key]: getBlogByIdResult.data?.data?.[key],
        }));
      }
    }
  }, [getBlogByIdResult.data, isUpdate]);

  if (getBlogByIdResult.isLoading || createAndUpdateBlogResult.isPending)
    return <Loader />;

  return (
    <>
      <div className="w-full p-6">
        <form
          onSubmit={handleSubmit}
          action=""
          method="post"
          className="space-y-8"
        >
          <ReactTextareaAutosize
            required
            value={formValue.title || ""}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Title"
            className="w-full resize-none border-none outline-none title font-medium"
          />
          <TextEditor
            placeholder="Write..."
            value={formValue.description || ""}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, description: e }))
            }
          />
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="btn-success text-xs"
          >
            Submit
          </button>
        </form>
      </div>

      {isOpen && (
        <div className="z-50 fixed top-0 left-0 right-0 bottom-0 overflow-y-auto bg-white">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6"
          >
            <MdClose size={24} />
          </button>
          <div className="py-10 px-6 min-h-full flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              action=""
              method="post"
              className="max-w-[1048px] w-full flex flex-col md:flex-row gap-16"
            >
              {/* left  */}
              <div className="flex-1">
                <div className="mb-4 text-base font-medium">Story Preview</div>
                <div className="space-y-4">
                  {/* thumbnail  */}
                  <label htmlFor="file" className="block cursor-pointer">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="hidden"
                      accept="images/*"
                      onChange={(e) => setFile(e.target.files?.[0] as File)}
                    />
                    {!file && !formValue.thumbnail && (
                      <div className="aspect-video bg-bgSecondaryColor text-textSecondaryColor flex items-center justify-center text-center">
                        <div className="flex flex-col gap-2 items-center">
                          <MdUpload size={20} />
                          <div className="font-medium">Upload and preview</div>
                          <div className="text-xs">
                            Include a high-quality image in your story to make
                            it more inviting to readers.
                          </div>
                        </div>
                      </div>
                    )}
                    {(file || formValue.thumbnail) && (
                      <div className="aspect-video">
                        <img
                          src={
                            file
                              ? URL.createObjectURL(file)
                              : formValue.thumbnail
                              ? formValue.thumbnail
                              : images.thumbnail_notFound
                          }
                          alt=""
                        />
                      </div>
                    )}
                  </label>

                  <ReactTextareaAutosize
                    required
                    value={formValue.title || ""}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full resize-none border-b outline-none text-xl"
                    placeholder="Write a preview title"
                  />

                  <ReactTextareaAutosize
                    value={formValue.content || ""}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    className="w-full resize-none border-b outline-none"
                    placeholder="Write a preview subtitle"
                  />
                  <div className="text-xs text-textSecondaryColor">
                    <span className="font-medium">Note: </span>
                    <span>
                      Changes here will affect how your story appears in public
                      places like Medium’s homepage and in subscribers’ inboxes
                      — not the contents of the story itself.
                    </span>
                  </div>
                </div>
              </div>
              {/* right  */}
              <div className="flex-1">
                <div className="mb-4 text-base text-textSecondaryColor">
                  Publishing to:{" "}
                  <span className="font-medium">{user?.name}</span>
                </div>
                <div className="space-y-4">
                  <TopicInput
                    listData={formValue.topic}
                    setListData={(data) => {
                      setFormValue({ ...formValue, topic: data });
                    }}
                  />
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        createAndUpdateBlogResult.mutate({
                          ...formValue,
                          status: true,
                        })
                      }
                      type="button"
                      className="btn-success text-xs"
                    >
                      Publish now
                    </button>
                    <button
                      onClick={() =>
                        createAndUpdateBlogResult.mutate({
                          ...formValue,
                          status: false,
                        })
                      }
                      type="button"
                      className="btn border-black text-xs"
                    >
                      Draft now
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUpdateBlogPage;
