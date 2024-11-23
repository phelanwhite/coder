import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSigninRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSaveStateRedirect = useCallback(() => {
    const arrayPath = [`signin`, `signup`, `forgot-password`, `reset-password`];
    if (arrayPath.find((item) => location.pathname.includes(item))) return;

    sessionStorage.setItem("redirect_state", JSON.stringify(location));
  }, [location]);

  const handleRedirectUrl = useCallback(() => {
    const redirect_state = JSON.parse(
      sessionStorage.getItem("redirect_state") as string
    );
    const link = redirect_state
      ? redirect_state?.pathname + redirect_state?.search
      : "/";
    navigate(link, {
      replace: true,
    });
  }, []);

  return {
    handleSaveStateRedirect,
    handleRedirectUrl,
  };
};

export default useSigninRedirect;
