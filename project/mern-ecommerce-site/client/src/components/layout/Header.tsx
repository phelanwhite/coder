import { FaOpencart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import AuthButtonMenu from "../common/auth/AuthButtonMenu";
import { memo } from "react";

const Header = () => {
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
          <Link to={`/customer/cart`}>
            <IoCartOutline size={24} />
          </Link>
          <AuthButtonMenu />
        </div>
      </div>
    </>
  );
};

export default memo(Header);
