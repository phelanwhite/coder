import { useMutation } from "@tanstack/react-query";
import React, { FC, memo, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth-store";
import Loader from "@/components/layouts/loader";
import { images } from "@/assets/constants";

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
    avatar: "",
    name: "",
    phone: "",
    dob: "",
    address: "",
    education: "",
    website: "",
    bio: "",
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
    updateProfileResult.mutate(formValue);
  };
  if (!isOpen) return <></>;
  if (updateProfileResult.isPending) return <Loader />;
  return (
    <div className="fixed p-4 top-0 left-0 right-0 bottom-0 z-50 bg-black/30 overflow-auto">
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
              Name
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
            <label id="phone" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formValue.phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label id="dob" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formValue.dob}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label id="address" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formValue.address}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label id="education" htmlFor="education">
              Education
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={formValue.education}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label id="website" htmlFor="website">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formValue.website}
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
