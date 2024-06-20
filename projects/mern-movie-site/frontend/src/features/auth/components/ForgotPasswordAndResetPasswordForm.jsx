import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../services/authApi";
import Loader from "components/ui/loader";

const ForgotPasswordAndResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    cf_password: "",
  });

  // check the route is signin or signup
  const location = useLocation();
  const [isForgotPassword, setIsForgotPassword] = useState(true);
  useEffect(() => {
    if (location.pathname.includes("forgot-password")) {
      setIsForgotPassword(true);
    }
    if (location.pathname.includes("reset-password")) {
      setIsForgotPassword(false);
    }
  }, [location.pathname]);

  const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();

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

      if (isForgotPassword) {
        forgotPassword({ email: formValue.email });
      } else {
        resetPassword({
          token: searchParams.toString(),
          data: {
            password: formValue.password,
            cf_password: formValue.cf_password,
          },
        });
      }
    },
    [formValue, isForgotPassword]
  );

  // forgotPasswordResult
  useEffect(() => {
    if (forgotPasswordResult.isSuccess) {
      toast.success(forgotPasswordResult.data?.message);
    }
    if (forgotPasswordResult.isError) {
      toast.error(forgotPasswordResult.error?.data?.message);
    }
  }, [forgotPasswordResult]);

  // resetPasswordResult
  useEffect(() => {
    if (resetPasswordResult.isSuccess) {
      toast.success(resetPasswordResult.data?.message);
    }
    if (resetPasswordResult.isError) {
      toast.error(resetPasswordResult.error?.data?.message);
    }
  }, [resetPasswordResult]);

  if (forgotPasswordResult.isLoading || resetPasswordResult.isLoading)
    return <Loader />;

  return (
    <div className="max-w-[600px] w-full mx-auto p-6 border rounded-lg shadow">
      {isForgotPassword ? (
        <div className="text-xl font-semibold mb-6">Forgot Password</div>
      ) : (
        <div className="text-xl font-semibold mb-6">Reset Password</div>
      )}
      <form onSubmit={handleSubmit} action="" method="post">
        <div className="flex flex-col gap-4">
          {isForgotPassword && (
            <>
              <div>Please enter your email to search for your account.</div>
              <input
                type="email"
                className="input-box"
                placeholder="Email"
                name="email"
                value={formValue.email}
                onChange={handleChangeInput}
              />
            </>
          )}
          {!isForgotPassword && (
            <>
              <div>
                Create a new password. A password is a password merged from
                characters, numbers, and accents.
              </div>
              <input
                type="password"
                className="input-box"
                placeholder="Password"
                name="password"
                value={formValue.password}
                onChange={handleChangeInput}
              />
              <input
                type="password"
                className="input-box"
                placeholder="Cf password"
                name="cf_password"
                value={formValue.cf_password}
                onChange={handleChangeInput}
              />
            </>
          )}

          <button
            disabled={
              forgotPasswordResult.isLoading || resetPasswordResult.isLoading
            }
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(ForgotPasswordAndResetPasswordForm);
