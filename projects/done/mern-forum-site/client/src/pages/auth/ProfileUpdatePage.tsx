import { IMAGES_DEFAULT } from "@/assets/constants/images-constant";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileUpdatePage = () => {
  const { user, updateProfile } = useAuthStore();
  const updateProfileResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      Object.entries(formValue).forEach((item) => {
        if (Array.isArray(item[1])) {
          item[1].forEach((value) => {
            formData.append(item[0], value);
          });
        } else {
          formData.append(item[0], item[1] as string);
        }
      });
      if (avatar) {
        formData.append("avatar", avatar);
      }
      if (banner) {
        formData.append("banner", banner);
      }
      return await updateProfile(formData);
    },
    onSuccess: (data) => {
      // Handle success
      toast.success(data?.message);
    },
    onError: (error) => {
      // Handle error
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    for (const key in formValue) {
      setFormValue((prev) => ({
        ...prev,
        ...(user?.[key] && {
          [key]: user?.[key],
        }),
      }));
    }
  }, [user]);

  const [formValue, setFormValue] = useState({
    name: "",
    avatar: "",
    banner: "",
    bio: "",
    address: "",
    education: "",
    phone: "",
    website: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit form data to server
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-w-[800px] w-full mx-auto px-3">
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4 "
      >
        <div className="relative mb-12">
          {/* banner  */}
          <label
            htmlFor="banner"
            className="rounded-lg overflow-hidden h-[200px] block cursor-pointer"
          >
            {formValue?.banner || banner ? (
              <img
                src={banner ? URL.createObjectURL(banner) : formValue?.banner}
                alt=""
                loading="lazy"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full"></div>
            )}
            <input
              id="banner"
              name="banner"
              className="hidden"
              type="file"
              onChange={(e) => setBanner(e.target.files?.[0] as File)}
            />
          </label>

          {/* avatar  */}
          <label
            htmlFor="avatar"
            className="cursor-pointer absolute -bottom-12 left-[50%] -translate-x-[50%] p-1 bg-white rounded-full w-max  mx-auto"
          >
            <div className="w-24 h-24 overflow-hidden rounded-full">
              <img
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : formValue?.avatar
                    ? formValue?.avatar
                    : IMAGES_DEFAULT.account_notfound
                }
                loading="lazy"
                alt=""
              />
            </div>
            <input
              id="avatar"
              name="avatar"
              className="hidden"
              type="file"
              onChange={(e) => setAvatar(e.target.files?.[0] as File)}
            />
          </label>
        </div>

        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          value={formValue.name}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formValue.address}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="education"
          placeholder="Education"
          value={formValue.education}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formValue.phone}
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formValue.website}
          onChange={handleInputChange}
          className="input-field"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formValue.bio}
          onChange={handleInputChange}
          className="input-field"
        />
        <button
          onClick={() => updateProfileResult.mutate()}
          disabled={updateProfileResult.isPending}
          className="btn btn-success"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
