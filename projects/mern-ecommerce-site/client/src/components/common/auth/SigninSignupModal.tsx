import InputField from "@/components/form/InputField";
import Modal from "@/components/form/Modal";
import env from "@/configs/env-config";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import React, { FC, memo, useEffect, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../../form/loader";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const SigninSignupModal: FC<Props> = ({ isOpen, onClose }) => {
  const { user, logginWithPassportSuccess, loggin, resgister } = useAuthStore();
  const loginRegisterResult = useMutation({
    mutationFn: async () => {
      if (isRegister) {
        return await resgister(formValue);
      } else {
        const { confirmPassword, name, ...other } = formValue;
        return await loggin(other);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const [isRegister, setRegister] = useState(false);
  const handleToggleRegister = () => setRegister(!isRegister);

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginRegisterResult.mutate();
  };

  // signin with google
  const handleGoogleLogin = () => {
    const url = env.PORT_SERVER + `/passport/google`;
    window.open(url, "_self");
  };

  // signin with passport
  useEffect(() => {
    !user && logginWithPassportSuccess();
  }, [user]);

  if (loginRegisterResult.isPending) return <Loader />;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hello,"
      content="Login or Create Account"
    >
      <div>
        <form
          action=""
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {isRegister && (
            <InputField
              required
              label="Name"
              name="name"
              value={formValue.name}
              onChange={handleInputChange}
            />
          )}
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
          {isRegister && (
            <InputField
              required
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formValue.confirmPassword}
              onChange={handleInputChange}
            />
          )}
          <button type="submit" className="btn btn-primary">
            {isRegister ? `Register` : `Login`}{" "}
          </button>
        </form>

        <div className="text-center my-6">
          <span className="text-secondary-1">
            {isRegister
              ? `Already have an account`
              : `Don't have an account yet?`}
          </span>{" "}
          <button onClick={handleToggleRegister} className="text-link">
            {isRegister ? `Login` : `Register`}
          </button>
        </div>

        <div className="my-6 flex gap-4 items-center">
          <hr className="flex-1" />
          <span>Or continue with</span>
          <hr className="flex-1" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <button onClick={handleGoogleLogin}>
            <FaGoogle size={24} />
          </button>
          <button>
            <FaFacebook size={24} />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(SigninSignupModal);
