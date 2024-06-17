import TextEditor from "components/text-editor";
import UploadAndPreview from "components/upload-and-preview";
import React, { memo, useEffect, useState } from "react";
import {
  usePost_createMutation,
  usePost_get_idQuery,
  usePost_update_idMutation,
} from "./postApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "components/Loader";

const PostCreateAndUpdateForm = () => {
  const { id } = useParams();
  const postGetId = usePost_get_idQuery({ id });
  const [createPost, createPostResult] = usePost_createMutation();
  const [updateIdPost, updateIdPostResult] = usePost_update_idMutation();

  const [formValue, setFormValue] = useState({
    thumbnail: "",
    name: "",
    desc_short: "",
    desc: "",
    tags: "",
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValue).forEach((item) => {
      formData.append(item[0], item[1]);
    });
    formData.append("file", file);
    if (window.location.pathname.includes(`create`)) {
      createPost({ body: formData });
    }
    if (id && window.location.pathname.includes(`update`)) {
      updateIdPost({ id, body: formData });
    }
  };

  useEffect(() => {
    if (id && window.location.pathname.includes(`update`)) {
      setFormValue((prev) => ({ ...prev, ...postGetId.data }));
    }
  }, [postGetId, id]);

  useEffect(() => {
    if (createPostResult.isSuccess) {
      toast.success(createPostResult?.data?.message);
    }
    if (createPostResult.isError) {
      toast.error(createPostResult?.error?.data?.message);
    }
  }, [createPostResult]);

  useEffect(() => {
    if (updateIdPostResult.isSuccess) {
      toast.success(updateIdPostResult?.data?.message);
    }
    if (updateIdPostResult.isError) {
      toast.error(updateIdPostResult?.error?.data?.message);
    }
  }, [updateIdPostResult]);

  if (updateIdPostResult.isLoading || createPostResult.isLoading)
    return <Loader />;

  return (
    <div>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="max-w-60 overflow-hidden rounded-lg">
            <UploadAndPreview
              setFileData={setFile}
              previewUrl={formValue.thumbnail}
            />
          </div>
          <input
            className="input-box"
            name="name"
            placeholder="Name"
            value={formValue.name}
            onChange={handleInputChange}
          />
          <textarea
            rows={3}
            className="input-box resize-none"
            name="tags"
            placeholder="Tags"
            value={formValue.tags}
            onChange={handleInputChange}
          />
          <textarea
            rows={3}
            className="input-box resize-none"
            name="desc_short"
            placeholder="Desc Short"
            value={formValue.desc_short}
            onChange={handleInputChange}
          />
          <TextEditor
            value={formValue.desc}
            onChange={(e) => setFormValue((prev) => ({ ...prev, desc: e }))}
          />
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default memo(PostCreateAndUpdateForm);
