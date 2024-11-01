import Loader from "@/components/form/loader";
import InputField from "@/components/form/InputField";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const ChangePasswordPage = () => {
  const { changePassword } = useAuthStore();
  const changePasswordResult = useMutation({
    mutationFn: async () => {
      return await changePassword(formValue);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [formValue, setFormValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changePasswordResult.mutate();
  };

  if (changePasswordResult.isPending) return <Loader />;

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <InputField
          required
          label="old Password"
          name="oldPassword"
          value={formValue.oldPassword}
          onChange={handleInputChange}
        />
        <InputField
          required
          label="new Password"
          name="newPassword"
          value={formValue.newPassword}
          onChange={handleInputChange}
        />
        <InputField
          required
          label="confirm Password"
          name="confirmPassword"
          value={formValue.confirmPassword}
          onChange={handleInputChange}
        />

        <button
          disabled={changePasswordResult.isPending}
          type="submit"
          className="btn btn-primary"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
