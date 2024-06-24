import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSigninMutation, useSignupMutation } from "../services/authApi";
import { setCurrentUser } from "../services/authSlice";
import Loader from "components/ui/loader";
import envConfig from "configs/envConfig";

const clientUrl = envConfig.serverUrl;

const SigninAndSignupForm = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    cf_password: "",
  });
  const dispatch = useDispatch();

  // check the route is signin or signup
  const location = useLocation();
  const [isSignup, setIsSignup] = useState(true);
  useEffect(() => {
    if (location.pathname.includes("signup")) {
      setIsSignup(true);
    }
    if (location.pathname.includes("signin")) {
      setIsSignup(false);
    }
  }, [location.pathname]);

  const [signin, signinResult] = useSigninMutation();
  const [signup, signupResult] = useSignupMutation();

  // handle input change and from submit
  const handleChangeInput = useCallback(
    (e) => {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
      });
    },
    [formValue]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (isSignup) {
        signup(formValue);
      } else {
        signin({ email: formValue.email, password: formValue.password });
      }
    },
    [formValue, isSignup]
  );

  // signinResult
  useEffect(() => {
    if (signinResult.isSuccess) {
      toast.success(signinResult.data?.message);
      dispatch(setCurrentUser(signinResult.data?.result));
      navigate(-1);
    }
    if (signinResult.isError) {
      toast.error(signinResult.error?.data?.message);
    }
  }, [signinResult]);

  // signupResult
  useEffect(() => {
    if (signupResult.isSuccess) {
      toast.success(signupResult.data?.message);
    }
    if (signupResult.isError) {
      toast.error(signupResult.error?.data?.message);
    }
  }, [signupResult]);

  const handleSigninWithGoogle = () => {
    window.open(`${clientUrl}auth/google`, "_self");
  };
  const handleSigninWithFacebook = () => {
    window.open(`${clientUrl}auth/facebook`, "_self");
  };
  const handleSigninWithGithub = () => {
    window.open(`${clientUrl}auth/github`, "_self");
  };

  if (signinResult.isLoading || signupResult.isLoading) return <Loader />;

  return (
    <div className="max-w-[600px] w-full mx-auto p-6 border rounded-lg shadow">
      {isSignup ? (
        <div className="text-xl font-semibold mb-6">Signup</div>
      ) : (
        <div className="text-xl font-semibold mb-6">Signin</div>
      )}
      <form onSubmit={handleSubmit} action="" method="post">
        <div className="flex flex-col gap-4">
          {isSignup && (
            <input
              type="text"
              className="input-box"
              placeholder="Name"
              name="name"
              value={formValue.name}
              onChange={handleChangeInput}
            />
          )}
          <input
            type="email"
            className="input-box"
            placeholder="Email"
            name="email"
            value={formValue.email}
            onChange={handleChangeInput}
          />
          <input
            type="password"
            className="input-box"
            placeholder="Password"
            name="password"
            value={formValue.password}
            onChange={handleChangeInput}
          />
          {isSignup && (
            <input
              type="password"
              className="input-box"
              placeholder="Confirm  password"
              name="cf_password"
              value={formValue.cf_password}
              onChange={handleChangeInput}
            />
          )}
          <div className="flex items-center justify-end">
            <Link className="text-link text-xs" to={`/forgot-password`}>
              Forgot Password
            </Link>
          </div>

          <button
            disabled={signinResult.isLoading || signupResult.isLoading}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4 flex flex-col gap-4">
        <div className="text-center font-semibold">or</div>
        <button onClick={handleSigninWithGoogle} className="btn btn-danger">
          <FaGoogle />
          Signin With Google
        </button>
        <button onClick={handleSigninWithFacebook} className="btn btn-primary">
          <FaFacebook />
          Signin With Facebook
        </button>
        <button onClick={handleSigninWithGithub} className="btn btn-dark">
          <FaGithub />
          Signin With Github
        </button>

        <div className="flex items-center justify-center">
          {isSignup ? (
            <Link className="text-link text-xs" to={`/signin`}>
              Signin
            </Link>
          ) : (
            <Link className="text-link text-xs" to={`/signup`}>
              Signup
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SigninAndSignupForm);
