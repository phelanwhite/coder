import env from "@/config/env-config";
import { useAuthStore } from "@/store/auth-store";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SigninSignupPage = () => {
  const { signinWithPassportSuccess } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await signinWithPassportSuccess();
      console.log({ response });
      if (response?.status === 200) {
        navigate("/");
      }
    })();
  }, []);

  // signin with Google
  const signinWithGoogle = () => {
    const url = env.PORT_SERVER + `/passport/google`;
    console.log(url);

    window.open(url, "_self");
  };

  return (
    <div className="p-4">
      <div className="max-w-[680px] w-full mx-auto shadow border p-10 rounded-lg flex flex-col items-center gap-4">
        <div className="text-center text-2xl">Welcome back.</div>
        <button
          onClick={signinWithGoogle}
          type="button"
          className="btn border-black max-w-[300px] w-full flex items-center justify-center gap-4"
        >
          <FaGoogle size={16} />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SigninSignupPage;
