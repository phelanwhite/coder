import { images } from "@/assets/constants";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import React, { FC, memo, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Loader from "../layout/loader";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileInformationForm: FC<Props> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const { user, updateProfile } = useAuthStore();
  const updateProfileResult = useMutation({
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
      return await updateProfile(formData);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [formValue, setFormValue] = useState({
    name: "",
    pronouns: "",
    bio: "",
    avatar: "",
  });
  useEffect(() => {
    if (user) {
      for (const key in formValue) {
        setFormValue((prev) => ({
          ...prev,
          [key]: user?.[key],
        }));
      }
    }
  }, [user]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit form data to server
    // onClose();
    updateProfileResult.mutate(formValue);
    // onClose();
  };
  if (!isOpen) return <></>;
  if (updateProfileResult.isPending) return <Loader />;
  return (
    <div className="fixed p-4 top-0 left-0 right-0 bottom-0 z-50 bg-black/30">
      <div onClick={onClose} className="absolute inset-0"></div>
      <div className="relative max-w-[540px] w-full mx-auto my-6 p-6 rounded-lg shadow bg-white">
        <button onClick={onClose} className="absolute top-4 right-4">
          <MdClose size={20} />
        </button>
        <div className="text-center text-xl font-semibold mb-6">
          Profile information
        </div>
        <form
          onSubmit={handleSubmit}
          action=""
          method="post"
          className="flex flex-col gap-4"
        >
          <label
            htmlFor="file"
            className="cursor-pointer block w-20 h-20 overflow-hidden rounded-full border mx-auto"
          >
            <input
              onChange={(e) => setFile(e.target.files?.[0] as File)}
              type="file"
              id="file"
              className="hidden"
              accept="image/*"
            />
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : formValue?.avatar
                  ? formValue?.avatar
                  : images.account_notfound
              }
              loading="lazy"
              alt=""
            />
          </label>
          <div>
            <label id="name" htmlFor="name">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formValue.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label id="pronouns" htmlFor="pronouns">
              Pronouns
            </label>
            <input
              type="text"
              id="pronouns"
              name="pronouns"
              value={formValue.pronouns}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label id="bio" htmlFor="bio">
              Short bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formValue.bio}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(ProfileInformationForm);
