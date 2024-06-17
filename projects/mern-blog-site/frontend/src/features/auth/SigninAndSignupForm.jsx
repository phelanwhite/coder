import React, { useState, useEffect, memo } from "react";
import Wrapper from "components/Wrapper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSigninMutation, useSignupMutation } from "features/auth/authApi";
import Loader from "components/Loader";
import { toast } from "react-toastify";
import { setCurrentUser } from "features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useThemeContext } from "contexts/themeContext";

const SigninAndSignupForm = () => {
  const { theme } = useThemeContext();
  const [isSignin, setIsSignin] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const naviagate = useNavigate();
  useEffect(() => {
    if (location.pathname.includes(`signin`)) {
      setIsSignin(true);
    }
    if (location.pathname.includes(`signup`)) {
      setIsSignin(false);
    }
  }, [location.pathname]);

  const [signup, signupResult] = useSignupMutation();
  const [signin, signinResult] = useSigninMutation();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignin) {
      const { name, confirm_password, ...other } = formValue;
      signin({ body: other });
    } else {
      signup({ body: formValue });
    }
  };

  useEffect(() => {
    if (isSignin) {
      if (signinResult.isSuccess) {
        dispatch(setCurrentUser(signinResult.data?.result));
        naviagate("/");
        // window.location.reload();
        toast.success(signinResult.data?.message);
      }
      if (signinResult.isError) {
        toast.error(signinResult.error.data?.message);
      }
    } else {
      if (signupResult.isSuccess) {
        naviagate(`/signin`);
        toast.success(signupResult.data);
      }
      if (signupResult.isError) {
        toast.error(signupResult.error.data?.message);
      }
    }
  }, [signinResult, signupResult, isSignin]);

  if (signinResult.isLoading || signupResult.isLoading) return <Loader />;

  return (
    <div>
      <Wrapper>
        <div
          className={[
            `max-w-[500px] w-full mx-auto py-6 px-4 rounded-lg overflow-hidden`,
            !theme ? `border` : `border border-slate-700`,
          ].join(" ")}
        >
          {isSignin ? (
            <div className="text-xl font-semibold mb-6">Signin</div>
          ) : (
            <div className="text-xl font-semibold mb-6">Signup</div>
          )}
          <form onSubmit={handleSubmit} action="" method="post">
            <div className="flex flex-col gap-4">
              {!isSignin && (
                <input
                  className="input-box"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={formValue.name || ""}
                  onChange={handleInputChange}
                />
              )}
              <input
                className="input-box"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formValue.email || ""}
                onChange={handleInputChange}
              />
              <input
                className="input-box"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formValue.password || ""}
                onChange={handleInputChange}
              />
              {!isSignin && (
                <input
                  className="input-box"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required
                  value={formValue.confirm_password || ""}
                  onChange={handleInputChange}
                />
              )}

              <div className="flex justify-end">
                <Link
                  className="link text-sm"
                  to={`/`}
                  // to={`/forgot-password`}
                >
                  Forgot password
                </Link>
              </div>

              {isSignin ? (
                <>
                  <button
                    disabled={signinResult.isLoading}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  <Link className="link text-sm text-center" to={`/signup`}>
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <button
                    disabled={signupResult.isLoading}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  <Link className="link text-sm text-center" to={`/signin`}>
                    Signin
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>
      </Wrapper>
    </div>
  );
};
export default memo(SigninAndSignupForm);
