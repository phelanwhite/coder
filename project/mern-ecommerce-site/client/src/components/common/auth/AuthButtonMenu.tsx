import React, { memo, useState } from "react";
import SigninSignupModal from "./SigninSignupModal";
import { useAuthStore } from "@/stores/auth-store";
import { authMenuLinks } from "@/assets/constants/links";
import { Link } from "react-router-dom";

const AuthButtonMenu = () => {
  const { user, loggout } = useAuthStore();
  const [isOpenSigninSignupModal, setIsOpenSigninSignupModal] = useState(false);
  const handleOpenSigninSignupModal = () => setIsOpenSigninSignupModal(true);
  const handleCloseSigninSignupModal = () => setIsOpenSigninSignupModal(false);
  return (
    <>
      <div>
        {user ? (
          <div className="relative z-10 group">
            <button className="btn btn-info">Account</button>
            <div className="hidden group-hover:block absolute top-full right-0 w-[220px] bg-white rounded-lg shadow-lg border py-2">
              <ul>
                {authMenuLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={`/customer` + item.path}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={loggout}
                    className="text-left block w-full px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={handleOpenSigninSignupModal}
            className="btn btn-primary"
          >
            Signin
          </button>
        )}
      </div>
      <SigninSignupModal
        isOpen={isOpenSigninSignupModal}
        onClose={handleCloseSigninSignupModal}
      />
    </>
  );
};

export default memo(AuthButtonMenu);
