import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEvent, FormEvent, useState } from "react";
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
      toast.error(error?.message);
    },
  });
  const [formValue, setFormValue] = useState({
    newPassword: "",
    confirmPassword: "",
  });

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
    changePasswordResult.mutate();
  };
  return (
    <div className="shadow rounded p-4 border">
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="flex flex-col gap-4 "
      >
        <input
          placeholder="New Password"
          name="newPassword"
          value={formValue?.newPassword || ""}
          onChange={handleChange}
          type="text"
          className="input"
        />
        <input
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formValue?.confirmPassword || ""}
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

export default ChangePasswordPage;
