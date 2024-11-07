import { gender_options } from "@/assets/constants/commons";
import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import Loader from "@/components/layout/loader";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateMePage = () => {
  const [formValue, setFormValue] = useState({
    avatar: "",
    name: "",
    phone: "",
    gender: "",
    bio: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMeResult.mutate();
  };

  const { updateProfile, getMe } = useAuthStore();
  const getMeResult = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      return await getMe();
    },
  });
  const updateMeResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();

      Object.entries(formValue).forEach((item) => {
        formData.append(item[0], item[1]);
      });
      if (file) {
        formData.append("file", file);
      }

      return await updateProfile(formData);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (getMeResult.data?.data) {
      setFormValue((prev) => ({ ...prev, ...getMeResult.data?.data }));
    }
  }, [getMeResult.data]);

  if (updateMeResult.isPending || getMeResult.isLoading) return <Loader />;

  return (
    <div className="shadow rounded p-4 border">
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <label htmlFor="file" className="w-max mx-auto">
          <div className="w-48 h-48 border rounded-full overflow-hidden mx-auto cursor-pointer">
            <img
              src={
                preview
                  ? (preview as string)
                  : formValue?.avatar
                  ? formValue?.avatar
                  : IMAGES_DEFAULT.account_notfound
              }
              loading="lazy"
              alt=""
            />
          </div>
          <input
            className="hidden"
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files?.[0] as File)}
          />
        </label>
        <input
          placeholder="Name"
          name="name"
          value={formValue?.name || ""}
          onChange={handleChange}
          type="text"
          required
          className="input"
        />
        <select
          className="input"
          name="gender"
          id="gender"
          value={formValue.gender}
          onChange={handleChange}
        >
          {gender_options.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.title}
              </option>
            );
          })}
        </select>
        <input
          placeholder="Phone"
          name="phone"
          value={formValue?.phone || ""}
          onChange={handleChange}
          type="text"
          className="input"
        />
        <textarea
          rows={5}
          placeholder="Bio"
          name="bio"
          value={formValue?.bio || ""}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateMePage;
