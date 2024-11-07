import { useAuthStore } from "@/stores/auth-store";
import { memo, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SigninSignupModal from "./SigninSignupModal";

const AuthProtected = () => {
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsOpen(true);
    }
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <SigninSignupModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
};

export default memo(AuthProtected);
