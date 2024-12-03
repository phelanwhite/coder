import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ENV from "@/configs/env-config";
import { ICONS_DEFAULT } from "@/constants/images-constant";
import InputField from "@/components/form/input-field";
import ButtonComponent from "@/components/form/button-component";
import Loader from "@/components/form/loader";

const SigninSignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignup, setIsSignup] = useState(false);
  useEffect(() => {
    location.pathname.includes(`signup`) && setIsSignup(true);
    location.pathname.includes(`signin`) && setIsSignup(false);
  }, [location.pathname]);

  const {
    signup,
    signin,
    signinPassportSuccess,
    isLoggedIn,
    redirectUrl,
    user,
  } = useAuthStore();
  const signinResult = useMutation({
    mutationFn: async () => {
      const { email, password } = formValue;
      return await signin({ email, password });
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const signupResult = useMutation({
    mutationFn: async () => {
      return await signup(formValue);
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
  // redirect to page before login
  useEffect(() => {
    try {
      (async () => {
        const response = await signinPassportSuccess();
        if (response.status === 200 && !isLoggedIn) {
          const path = redirectUrl
            ? redirectUrl?.pathname + redirectUrl?.search
            : "/";
          navigate(path, {
            replace: true,
          });
        }
      })();
    } catch (error) {
      console.error(error);
    }
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
    if (isSignup) {
      signupResult.mutate();
    } else {
      signinResult.mutate();
    }
  };

  // redirect to page before login
  useEffect(() => {
    try {
      if (signinResult.isSuccess) {
        const path = redirectUrl
          ? redirectUrl?.pathname + redirectUrl?.search
          : "/";
        navigate(path, {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [signinResult]);

  useEffect(() => {
    isLoggedIn && localStorage.setItem(`_tracking_id`, user?._id);
  }, [isLoggedIn]);

  return (
    <>
      {(signinResult.isPending || signupResult.isPending) && <Loader />}
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-[560px] w-full p-4 flex flex-col justify-center gap-8">
          {/* top  */}
          <div className="flex flex-col gap-4">
            <Link to={`/`} className="w-14 inline-block mx-auto">
              <img src={ICONS_DEFAULT.logo_svg} alt="" />
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
              <InputField
                required
                placeholder="Name"
                type="text"
                name="name"
                value={formValue.name}
                onChange={handleFormChange}
              />
            )}
            <InputField
              required
              placeholder="Email"
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleFormChange}
            />
            <InputField
              required
              placeholder="Password"
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleFormChange}
            />
            {isSignup && (
              <InputField
                required
                placeholder="Confirm Password"
                type="password"
                name="confirm_password"
                value={formValue.confirm_password}
                onChange={handleFormChange}
              />
            )}

            <div className="text-right text-sm">
              <Link to={`/forgot-password`} className="text-blue-500">
                Forgot Password?
              </Link>
            </div>
            <ButtonComponent color="black" type="submit">
              Submit
            </ButtonComponent>
          </form>
          <div className="flex items-center gap-3 leading-none">
            <hr className="flex-1 mt-1" />
            <span>or</span>
            <hr className="flex-1 mt-1" />
          </div>
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
                Signin
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
    </>
  );
};

export default SigninSignupPage;
