import ButtonComponent from "@/components/form/button-component";
import ReactQuillNew from "@/components/form/react-quill-new";
import { PostType } from "@/constants/type";
import React, { ChangeEvent, useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import PostPreview from "./PostPreview";
import { getDateTimeLocalToString } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loader from "@/components/form/loader";
import { axiosConfigV1 } from "@/configs/axios-config";

const PostCreateUpdatePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const getDataResult = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const url = `post/get-post-by-id/${id}`;
      const response = (await axiosConfigV1.get(url)).data;
      return response;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (getDataResult.isSuccess && getDataResult.data) {
      for (const key in formValue) {
        setFormValue((prev) => ({
          ...prev,
          ...(getDataResult.data?.data?.[key] && {
            [key]: getDataResult.data?.data?.[key],
          }),
        }));
      }
    } else {
      setFormValue({
        title: "",
        thumbnail: "",
        content: "",
        topics: [],
        article_origin: "",
        imageList: [],
        description: "",
        status: false,
        publication_time: getDateTimeLocalToString(new Date()),
      });
    }
  }, [getDataResult.data]);

  const [formValue, setFormValue] = useState<Omit<PostType, "_id">>({
    title: "",
    thumbnail: "",
    content: "",
    topics: [],
    article_origin: "",
    imageList: [],
    description: "",
    status: false,
    publication_time: getDateTimeLocalToString(new Date()),
  });
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <div>
      {getDataResult.isLoading && <Loader />}
      <div className="px-5">
        <PostPreview
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          data={formValue}
          onchangeData={setFormValue}
          idPost={id}
        />
        <form onSubmit={onSubmit} action="" method="post" className="space-y-4">
          <ReactTextareaAutosize
            placeholder="Title"
            className="w-full resize-none border-none outline-none text-2xl font-medium"
            value={formValue.title}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <ReactQuillNew
            type="blog"
            placeholder="Write..."
            value={formValue.description}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, description: e }))
            }
            uploadFiles={formValue.imageList}
          />
          <ButtonComponent
            disabled={formValue.title ? false : true}
            onClick={() => setIsOpen(true)}
            color="black"
            size="xs"
            className="rounded-full"
          >
            Done
          </ButtonComponent>
        </form>
      </div>
    </div>
  );
};

export default PostCreateUpdatePage;
