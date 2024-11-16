import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuthStore();
  const forgotPasswordResult = useMutation({
    mutationFn: async () => {
      return await forgotPassword(formValue);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // form
  const [formValue, setFormValue] = useState({
    email: "",
  });
  // handle form change
  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    forgotPasswordResult.mutate();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[560px] w-full p-4 flex flex-col justify-center gap-8">
        {/* top  */}
        <div className="flex flex-col gap-4">
          <Link
            to={`/`}
            className="mx-auto inline-block w-max py-2 px-2 rounded font-bold text-2xl bg-black text-white"
          >
            PW
          </Link>
          <div className="text-center text-2xl font-bold">
            Fogot Password the PLW Community
          </div>
        </div>
        {/* form  */}
        <form
          onSubmit={onSubmit}
          action=""
          method="post"
          className="flex flex-col gap-4"
        >
          <input
            required
            type="text"
            className="px-4 py-2 rounded border"
            name="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleFormChange}
          />

          <button
            type="submit"
            className="px-4 py-2 rounded text-white bg-black"
          >
            Submit
          </button>
        </form>
        <hr />
        {/* bottom */}
        <div className="text-center text-sm italic text-gray-500">
          By signing up, you are agreeing to our privacy policy, terms of use
          and code of conduct.
        </div>
        {/* switch between signup and signin */}
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to={`/signin`} className="text-blue-500">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
