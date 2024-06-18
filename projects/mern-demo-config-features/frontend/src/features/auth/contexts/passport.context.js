import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../services/authSlice";
import { useSigninPassportSuccessQuery } from "../services/authApi";
import { toast } from "react-toastify";

const PassportContext = createContext();

export const PassportProvider = ({ children }) => {
  const dispatch = useDispatch();
  const getPassport = useSigninPassportSuccessQuery();

  // getPassport
  useEffect(() => {
    if (getPassport.isSuccess) {
      dispatch(setCurrentUser(getPassport.data?.result));
      //   toast.success(getPassport.data?.message);
    }
    if (getPassport.isError) {
      //   toast.error(getPassport.error?.data?.message);
    }
  }, [getPassport]);

  const handleSigninWithGoogle = () => {
    window.open(`http://localhost:5000/auth/google`, "_self");
  };
  const handleSigninWithFacebook = () => {
    window.open(`http://localhost:5000/auth/facebook`, "_self");
  };
  const handleSigninWithGithub = () => {
    window.open(`http://localhost:5000/auth/github`, "_self");
  };

  return (
    <PassportContext.Provider
      value={{
        handleSigninWithGoogle,
        handleSigninWithFacebook,
        handleSigninWithGithub,
      }}
    >
      {children}
    </PassportContext.Provider>
  );
};

export const usePassportContext = () => useContext(PassportContext);
