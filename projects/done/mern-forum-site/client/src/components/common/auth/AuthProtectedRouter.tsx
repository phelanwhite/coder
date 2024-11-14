import { useAuthStore } from "@/stores/auth-store";
import React, { memo, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import SigninSignupModal from "./SigninSignupModal";

const AuthProtectedRouter = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  useEffect(() => {
    if (!isAuthenticated) setIsOpenModal(true);
    return () => {
      setIsOpenModal(false);
    };
  }, [isAuthenticated, location.pathname]);

  if (!isAuthenticated)
    return (
      <SigninSignupModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    );

  return <Outlet />;
};

export default memo(AuthProtectedRouter);
