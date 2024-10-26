import { ChangeEvent, useState } from "react";
import InputField from "@/components/form/InputField";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "@/components/form/loader";
import { useUserStore } from "@/stores/user-store";

const UserCreatePage = () => {
  const { createUser } = useUserStore();
  const createUserResult = useMutation({
    mutationFn: async () => {
      return await createUser(formValue);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUserResult.mutate();
  };

  if (createUserResult.isPending) return <Loader />;

  return (
    <div>
      <form
        action=""
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <InputField
          required
          label="Name"
          name="name"
          value={formValue.name}
          onChange={handleInputChange}
        />

        <InputField
          required
          label="Email"
          name="email"
          value={formValue.email}
          onChange={handleInputChange}
        />
        <InputField
          required
          type="password"
          label="Password"
          name="password"
          value={formValue.password}
          onChange={handleInputChange}
        />
        <InputField
          required
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={formValue.confirmPassword}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default UserCreatePage;
