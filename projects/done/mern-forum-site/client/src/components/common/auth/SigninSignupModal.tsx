import Modal from "@/components/layout/modal";
import env from "@/configs/env-config";
import { useAuthStore } from "@/stores/auth-store";
import { FC, memo, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

interface Prop {
  isOpen: boolean;
  onClose: () => void;
}

const SigninSignupModal: FC<Prop> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logginWithPassportSuccess, user } = useAuthStore();

  // signin with google
  const handleGoogleLogin = () => {
    const url = env.PORT_SERVER + `/passport/google`;
    window.open(url, "_self");
  };

  // signin with passport
  useEffect(() => {
    !user && logginWithPassportSuccess();
  }, [user]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return <></>;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="signin-signup-show-modal relative rounded-2xl max-w-[540px] max-h-full w-full bg-white overflow-y-auto">
        <button
          onClick={onClose}
          className="z-10 absolute top-4 right-4 bg-gray-100 text-xl rounded-full p-1"
        >
          <MdClose />
        </button>
        <div className="relative max-w-[400px] w-full mx-auto p-4 md:p-7 ">
          <div className="mx-auto w-max mt-12">
            <Link to={`/`}>
              <span className="bg-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
                PL
              </span>
            </Link>
          </div>
          <div className="font-bold text-xl text-center mt-3">
            Join the PLFORUM
          </div>
          {user && location.pathname.includes(`admin`) && (
            <div className="mt-3 text-red-500 text-center text-xs">
              You are not an administrator. Log in as administrator
            </div>
          )}
          <div className="text-sm text-center mt-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam,
            neque aspernatur nobis minus minima ut delectus, voluptate rerum
            quidem eveniet, dolorum sint maxime? Exercitationem, eum? Veritatis
            voluptatibus odit repellendus hic?
          </div>

          <div className="my-8 space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="flex gap-4 items-center text-sm font-medium w-full rounded-full border px-4 py-1.5 hover:bg-gray-100 transition"
            >
              <FaGoogle />
              <span className="flex-1 text-center">Sign in with google</span>
            </button>
          </div>
          <div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <span className="text-blue-500 hover:text-blue-700 underline cursor-pointer">
                Sign In
              </span>
            </div>
          </div>
          <div className="my-4 text-sm text-center text-blue-500 hover:text-blue-700 underline cursor-pointer">
            Forgot Password
          </div>
          <div className="text-text-secondary-color-2 text-xs text-center">
            Your continued use of this website means you agree to our terms of
            use.
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default memo(SigninSignupModal);
