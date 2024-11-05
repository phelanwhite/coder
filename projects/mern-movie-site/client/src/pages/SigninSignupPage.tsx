import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import Loader from "@/components/layout/loader";
import { useMutation } from "@tanstack/react-query";
import { IMAGE_MOVIE } from "@/assets/constants/images-constant";
import ENV from "@/configs/env-config";

const SigninSignupPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("signin")) {
      setIsSignup(false);
    } else {
      setIsSignup(true);
    }
  }, [location.pathname]);

  const { signin, signup, user, logginWithPassportSuccess } = useAuthStore();
  const signinSignupResult = useMutation({
    mutationFn: async () => {
      const { name, confirmPassword, ...other } = formValue;

      if (isSignup) {
        return signup(formValue);
      } else {
        return signin(other);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signinSignupResult.mutate();
  };

  // signin with google
  const handleGoogleLogin = () => {
    const url = ENV.PORT_SERVER + `/passport/google`;
    window.open(url, "_self");
  };

  if (signinSignupResult.isPending) return <Loader />;

  return (
    <div
      className="pt-32 px-4 min-h-screen"
      style={{
        background: `url(${IMAGE_MOVIE.banner_about}) no-repeat center/cover`,
      }}
    >
      <div className="max-w-[600px] w-full mx-auto bg-white rounded-lg p-6 space-y-8">
        <form
          onSubmit={handleSubmit}
          action=""
          method="post"
          className="flex flex-col gap-4"
        >
          <div className="font-semibold text-xl">
            {isSignup ? "Signup" : "Signin"}
          </div>
          {isSignup && (
            <input
              placeholder="Name"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              type="text"
              required
              className="input"
            />
          )}
          <input
            placeholder="Email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            type="email"
            required
            className="input"
          />
          <input
            placeholder="Password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            type="password"
            required
            className="input"
          />
          {isSignup && (
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formValue.confirmPassword}
              onChange={handleChange}
              type="password"
              required
              className="input"
            />
          )}
          <button className="btn btn-primary">Submit</button>
        </form>

        <div className="flex items-center gap-4">
          <hr className="flex-1" />
          <span>or</span>
          <hr className="flex-1" />
        </div>
        <div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-primary w-full"
          >
            Signin with google
          </button>
        </div>
        <div className="text-center">
          {isSignup ? (
            <Link
              to={`/signin`}
              className=" text-blue-500 hover:underline text-sm"
            >
              Signin
            </Link>
          ) : (
            <Link
              to={`/signup`}
              className=" text-blue-500 hover:underline text-sm"
            >
              Signup
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigninSignupPage;
