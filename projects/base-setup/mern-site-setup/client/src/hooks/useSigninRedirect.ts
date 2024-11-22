import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSigninRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSaveStateRedirect = useCallback(() => {
    if (
      location.pathname.includes(`signin`) ||
      location.pathname.includes(`signup`) ||
      location.pathname.includes(`forgot-password`) ||
      location.pathname.includes(`reset-password`)
    )
      return;

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
