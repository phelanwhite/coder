import { useAuthStore } from "@/stores/auth-store";
import { memo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SigninSignupModal from "../auth/SigninSignupModal";

const AdminProtected = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsOpen(true);
    }
    if (user?.role !== "admin") {
      setIsOpen(true);
    }
  }, [isAuthenticated]);

  return isAuthenticated && user?.role === "admin" ? (
    <Outlet />
  ) : (
    <SigninSignupModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
};

export default memo(AdminProtected);
