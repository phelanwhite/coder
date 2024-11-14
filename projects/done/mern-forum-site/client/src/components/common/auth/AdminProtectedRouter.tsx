import { useAuthStore } from "@/stores/auth-store";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SigninSignupModal from "./SigninSignupModal";

const AdminProtectedRouter = () => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") setIsOpenModal(true);
    return () => setIsOpenModal(false);
  }, [isAuthenticated, location.pathname]);

  if (!isAuthenticated || user?.role !== "admin")
    return (
      <SigninSignupModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    );

  return <Outlet />;
};

export default AdminProtectedRouter;
