import { FaOpencart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SigninSignupModal from "../common/auth/SigninSignupModal";
import { useState } from "react";

const Header = () => {
  const [isOpenSigninSignupModal, setIsOpenSigninSignupModal] = useState(false);
  const handleOpenSigninSignupModal = () => setIsOpenSigninSignupModal(true);
  const handleCloseSigninSignupModal = () => setIsOpenSigninSignupModal(false);

  return (
    <>
      <div className="p-4 shadow bg-white flex items-center justify-between">
        <Link
          to={`/`}
          className="font-bold text-xl text-blue-600 flex items-center gap-2"
        >
          <FaOpencart size={24} />
          <span>PW-Store</span>
        </Link>
        <div></div>
        <div className="flex items-center gap-4">
          <button>
            <IoCartOutline size={24} />
          </button>
          <button
            onClick={handleOpenSigninSignupModal}
            className="btn btn-primary"
          >
            Signin
          </button>
        </div>
      </div>
      <SigninSignupModal
        isOpen={isOpenSigninSignupModal}
        onClose={handleCloseSigninSignupModal}
      />
    </>
  );
};

export default Header;
