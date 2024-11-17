import { ChangeEvent, useEffect, useState } from "react";
import { Link, redirect, useLocation } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ENV from "@/configs/env-config";

const SigninSignupPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const location = useLocation();
  useEffect(() => {
    location.pathname.includes(`signup`) && setIsSignup(true);
    location.pathname.includes(`signin`) && setIsSignup(false);
  }, [location.pathname]);

  const { signup, signin, signinPassportSuccess } = useAuthStore();
  const signupSignUpResult = useMutation({
    mutationFn: async () => {
      if (isSignup) {
        return await signup(formValue);
      } else {
        const { email, password } = formValue;
        return await signin({ email, password });
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // signin with social account
  const handleGoogleLogin = () => {
    const url = ENV.PORT_SERVER + `/passport/google`;
    window.open(url, "_self");
  };
  useEffect(() => {
    signinPassportSuccess();
  }, []);

  // form
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
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
    signupSignUpResult.mutate();
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
            Join the PLW Community
          </div>
        </div>
        {/* form  */}
        <form
          onSubmit={onSubmit}
          action=""
          method="post"
          className="flex flex-col gap-4"
        >
          {isSignup && (
            <input
              required
              type="text"
              className="px-4 py-2 rounded border"
              name="name"
              placeholder="Name"
              value={formValue.name}
              onChange={handleFormChange}
            />
          )}
          <input
            required
            type="text"
            className="px-4 py-2 rounded border"
            name="email"
            placeholder="Email"
            value={formValue.email}
            onChange={handleFormChange}
          />
          <input
            required
            type="password"
            className="px-4 py-2 rounded border"
            name="password"
            placeholder="Password"
            value={formValue.password}
            onChange={handleFormChange}
          />
          {isSignup && (
            <input
              required
              type="password"
              className="px-4 py-2 rounded border"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formValue.confirm_password}
              onChange={handleFormChange}
            />
          )}
          {/* forgot password */}
          <div className="text-right text-sm">
            <Link to={`/forgot-password`} className="text-blue-500">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded text-white bg-black"
          >
            Submit
          </button>
        </form>
        <hr />
        {/* social media buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center border rounded px-4 py-2 w-full hover:bg-gray-100"
          >
            <FaGoogle />
            <div className="flex-1 text-sm text-center font-medium">
              Sign in with Google
            </div>
          </button>
          <button className="flex items-center border rounded px-4 py-2 w-full hover:bg-gray-100">
            <FaFacebook />
            <div className="flex-1 text-sm text-center font-medium">
              Sign in with Facebook
            </div>
          </button>
          <button className="flex items-center border rounded px-4 py-2 w-full hover:bg-gray-100">
            <FaGithub />
            <div className="flex-1 text-sm text-center font-medium">
              Sign in with Github
            </div>
          </button>
        </div>
        {/* bottom */}
        <div className="text-center text-sm italic text-gray-500">
          By signing up, you are agreeing to our privacy policy, terms of use
          and code of conduct.
        </div>
        {/* switch between signup and signin */}
        {isSignup ? (
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to={`/signin`} className="text-blue-500">
              Sign In
            </Link>
          </div>
        ) : (
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={`/signup`} className="text-blue-500">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SigninSignupPage;
