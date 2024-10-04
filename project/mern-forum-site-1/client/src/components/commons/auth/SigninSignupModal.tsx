import env from "@/configs/env-config";
import { useAuthStore } from "@/stores/auth-store";
import { FC, memo, useEffect, useState } from "react";
import { FaGoogle, FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SigninSignupModal: FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [] = useState();
  const { signinWithPassportSuccess } = useAuthStore();
  useEffect(() => {
    (async () => {
      if (!user) {
        const response = await signinWithPassportSuccess();
        if (response?.status === 200) {
          navigate("/");
        }
      }
    })();
  }, []);

  // signin with Google
  const signinWithGoogle = () => {
    const url = env.PORT_SERVER + `/passport/google`;
    window.open(url, "_self");
  };
  if (!isOpen) return <></>;
  return (
    <div className="bg-[rgb(153,153,153)] fixed top-0 left-0 bottom-0 right-0 z-[999] p-4">
      <div className="relative max-w-[540px] w-full mx-auto bg-white text-black rounded-2xl h-full p-8 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-stone-100 p-1 rounded-full text-xl"
        >
          <MdClose />
        </button>
        <div className="max-w-[350px] w-full mx-auto text-center space-y-4">
          <div className="title mt-12">Login to Blogger</div>
          <div className="text-red-500">
            Each person should use a separate account otherwise the shared
            account of many people will be locked.
          </div>
          <div className="py-8 space-y-4 max-w-[320px] w-full mx-auto ">
            <button className="flex gap-4 items-center border rounded-full px-4 py-2 w-full hover:bg-stone-100 transition">
              <FaUser />
              <span className="flex-1 justify-center font-medium">
                Email/ Phone Number
              </span>
            </button>
            <button
              onClick={signinWithGoogle}
              className="flex gap-4 items-center border rounded-full px-4 py-2 w-full hover:bg-stone-100 transition"
            >
              <FaGoogle />
              <span className="flex-1 justify-center font-medium">
                Sign in with Google
              </span>
            </button>
          </div>
          <div>
            You don't have an account yet?{" "}
            <button className="text-red-500 underline">Signup</button>
          </div>
          <div>
            You already have an account?{" "}
            <button className="text-red-500 underline">Signin</button>
          </div>
          <div>
            <button className="text-red-500 underline">Forgot password?</button>
          </div>
          <div className="text-xs text-textSecondaryColor">
            Your continued use of this website means you agree to our terms of
            use.
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SigninSignupModal);
