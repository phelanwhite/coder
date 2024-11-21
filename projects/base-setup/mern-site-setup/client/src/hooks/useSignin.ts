import React, { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

const useSignin = () => {
  const location = useLocation();
  const handleSaveStateRedirect = useCallback(() => {
    if (
      location.pathname.includes(`signin`) ||
      location.pathname.includes(`signup`) ||
      location.pathname.includes(`forgot-password`) ||
      location.pathname.includes(`reset-password`)
    )
      return;
    localStorage.setItem("redirect_state", JSON.stringify(location));
  }, [location]);

  const handleRemoveStateRedirect = useCallback(() => {
    localStorage.removeItem("redirect_state");
  }, []);

  const getRedirect_url = useMemo(() => {
    const redirect_state = JSON.parse(
      localStorage.getItem("redirect_state") as string
    );

    const link = redirect_state?.pathname + redirect_state?.search;
    return link;
  }, []);

  return {
    handleSaveStateRedirect,
    handleRemoveStateRedirect,
    getRedirect_url,
  };
};

export default useSignin;
