import TopicInput from "@/components/common/topic/TopicInput";
import ButtonComponent from "@/components/form/button-component";
import InputField from "@/components/form/input-field";
import Loader from "@/components/form/loader";
import { PostType } from "@/constants/type";
import { usePostStore } from "@/stores/post-store";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";

type Type = {
  isOpen?: boolean;
  onClose?: () => void;
  idPost?: string;
  onchangeData: React.Dispatch<React.SetStateAction<Omit<PostType, "_id">>>;
  data: Omit<PostType, "_id">;
};

const PostPreview = ({ isOpen, onClose, data, onchangeData, idPost }: Type) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navigate = useNavigate();

  const { createPost, updatePostById } = usePostStore();
  const createUpdateBlogResult = useMutation({
    mutationFn: async (status: boolean) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, value as string);
        }
      });
      if (file) {
        formData.append("file", file);
      }
      formData.set("status", status as unknown as string);

      if (idPost) {
        return await updatePostById(idPost, formData);
      } else {
        return await createPost(formData);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      navigate(`/me/post`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (!isOpen) return null;
  return (
    <div>
      {createUpdateBlogResult.isPending && <Loader />}
      <div className="fixed top-0 left-0 bottom-0 right-0 inset-0 z-[1000] text-xs p-4">
        <div
          onClick={onClose}
          className="-z-10 absolute inset-0 bg-black/50"
        ></div>
        <div className="relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-lg p-5 md:p-8 max-w-[1332px] max-h-full overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-1"
          >
            <MdClose size={20} />
          </button>
          <div className="font-medium text-base mb-4">Preview</div>
          <form
            onSubmit={onSubmit}
            action=""
            method="post"
            className="flex flex-col items-start gap-4 md:flex-row md:gap-20"
          >
            {/* left  */}
            <div className="flex-1 space-y-4">
              {/* thumbnail  */}
              <label htmlFor="file">
                <input
                  name="file"
                  id="file"
                  className="hidden"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] as File)}
                />
                {file || data?.thumbnail ? (
                  <div className="aspect-video overflow-hidden rounded">
                    <img
                      src={file ? URL.createObjectURL(file) : data?.thumbnail}
                      loading="lazy"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="p-8 bg-gray-50 rounded text-center text-sm h-[200px] flex items-center justify-center ">
                    Drag and drop photos here or click to select photos
                  </div>
                )}
              </label>
              <ReactTextareaAutosize
                placeholder="Title"
                className="w-full resize-none pb-1 outline-none border-b text-sm"
                value={data.title}
                onChange={(e) => {
                  onchangeData((prev: Omit<PostType, "_id">) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
              />
              <ReactTextareaAutosize
                placeholder="Content"
                className="w-full resize-none pb-1 outline-none border-b text-sm"
                value={data.content}
                onChange={(e) => {
                  onchangeData((prev: Omit<PostType, "_id">) => ({
                    ...prev,
                    content: e.target.value,
                  }));
                }}
              />
              {/* note  */}
              <div className="italic text-xs text-text-secondary-color">
                <span className="font-medium">Note: </span>
                <span>
                  The editing here does not affect the article content but only
                  changes the way the article is displayed on PL's Blog page and
                  on search engines like Google.
                </span>
              </div>
            </div>
            {/* right  */}
            <div className="flex-1 space-y-4">
              {/* article_origin */}
              <div className="space-y-1">
                <div className="text-xs text-text-secondary-color">
                  Article origin:
                </div>
                <InputField
                  className="w-full border-b pb-1 outline-none"
                  value={data?.article_origin}
                  onChange={(e) =>
                    onchangeData((prev: Omit<PostType, "_id">) => ({
                      ...prev,
                      article_origin: e.target.value,
                    }))
                  }
                />
              </div>
              {/* topics */}
              <div className="space-y-1">
                <div className="text-xs text-text-secondary-color">Topic:</div>
                <TopicInput
                  listData={data?.topics}
                  setListData={(e) =>
                    onchangeData((prev: Omit<PostType, "_id">) => ({
                      ...prev,
                      topics: e,
                    }))
                  }
                />
              </div>
              {/* publication_time */}
              <div className="space-y-1">
                <div className="text-xs text-text-secondary-color">
                  Publication time:
                </div>
                <div>
                  <InputField
                    className="w-full border-b p-1 px-3 outline-none"
                    type="datetime-local"
                    value={data?.publication_time}
                    onChange={(e) =>
                      onchangeData((prev: any) => ({
                        ...prev,
                        publication_time: e.target.value,
                      }))
                    }
                    disabled={true}
                  />
                </div>
              </div>
              {/* note  */}
              <div className="italic text-xs text-text-secondary-color">
                <span className="font-medium">Note: </span>
                <span>
                  This article will be automatically posted at the time
                  specified above.
                </span>
              </div>
              {/* button  */}
              <div className="flex gap-2">
                <ButtonComponent
                  type="button"
                  onClick={() => createUpdateBlogResult.mutate(true)}
                  disabled={data.title ? false : true}
                  className="rounded-full"
                  color="success"
                >
                  Published
                </ButtonComponent>
                <ButtonComponent
                  type="button"
                  onClick={() => createUpdateBlogResult.mutate(false)}
                  disabled={data.title ? false : true}
                  className="rounded-full"
                  color="error"
                >
                  Draft
                </ButtonComponent>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(PostPreview);
