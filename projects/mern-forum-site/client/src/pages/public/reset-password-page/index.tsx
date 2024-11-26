import ButtonComponent from "@/components/form/button-component";
import InputField from "@/components/form/input-field";
import Loader from "@/components/form/loader";
import { ICONS_DEFAULT } from "@/constants/images-constant";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const { resetPassword } = useAuthStore();
  const resetPasswordResult = useMutation({
    mutationFn: async () => {
      return await resetPassword(token as string, formValue);
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
    new_password: "",
    confirm_new_password: "",
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
    resetPasswordResult.mutate();
  };

  const navigate = useNavigate();
  useEffect(() => {
    resetPasswordResult.isSuccess && navigate(`/signin`);
  }, [resetPasswordResult.isSuccess]);

  return (
    <>
      {resetPasswordResult.isPending && <Loader />}
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-[560px] w-full p-4 flex flex-col justify-center gap-8">
          {/* top  */}
          <div className="flex flex-col gap-4">
            <Link to={`/`} className="w-14 inline-block mx-auto">
              <img src={ICONS_DEFAULT.logo_svg} alt="" />
            </Link>
            <div className="text-center text-2xl font-bold">
              Reset Password the PLW Community
            </div>
          </div>
          {/* form  */}
          <form
            onSubmit={onSubmit}
            action=""
            method="post"
            className="flex flex-col gap-4"
          >
            <InputField
              required
              placeholder="New password"
              type="password"
              name="new_password"
              value={formValue.new_password}
              onChange={handleFormChange}
            />
            <InputField
              required
              placeholder="Confirm new password"
              type="password"
              name="confirm_new_password"
              value={formValue.confirm_new_password}
              onChange={handleFormChange}
            />

            <ButtonComponent color="black" type="submit">
              Submit
            </ButtonComponent>
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
              Signin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
