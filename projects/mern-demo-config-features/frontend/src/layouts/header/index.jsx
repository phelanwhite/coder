import { useSignoutMutation } from "features/auth/services/authApi";
import { setCurrentUser } from "features/auth/services/authSlice";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.authSlice);
  console.log({ user });
  const [signout, signoutResult] = useSignoutMutation();
  //   // signoutResult
  useEffect(() => {
    if (signoutResult.isSuccess) {
      toast.success(signoutResult.data?.message);
    }
    if (signoutResult.isError) {
      toast.error(signoutResult.error?.data?.message);
    }
  }, [signoutResult]);

  const handleSignout = () => {
    signout();
    dispatch(setCurrentUser(null));
    navigate(`/signin`);
  };
  return (
    <div className="flex items-center gap-4">
      <Link to={`/`} className="btn btn-primary">
        Home
      </Link>
      <button className="btn btn-primary" onClick={handleSignout}>
        sign out
      </button>
      <Link to={`/update-profile`} className="btn btn-primary">
        update me
      </Link>
    </div>
  );
};

export default memo(Header);
