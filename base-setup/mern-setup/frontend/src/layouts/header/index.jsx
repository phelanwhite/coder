import { useSignoutMutation } from "features/auth/services/authApi";
import { setCurrentUser } from "features/auth/services/authSlice";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.authSlice?.currentUser?.data);
  console.log({ user });
  const [signout, signoutResult] = useSignoutMutation();

  const handleSignout = () => {
    dispatch(setCurrentUser(null));
    signout();
  };
  // signupResult
  useEffect(() => {
    if (signoutResult.isSuccess) {
      toast.success(signoutResult.data?.message);
    }
    if (signoutResult.isError) {
      toast.error(signoutResult.error?.data?.message);
    }
  }, [signoutResult]);

  return (
    <div className="flex items-center gap-4">
      <Link to={`/`} className="btn btn-primary">
        Home
      </Link>
      <Link to={`/update-profile`} className="btn btn-primary">
        update me
      </Link>
      <Link to={`/about`} className="btn btn-primary">
        about
      </Link>
      <Link to={`/contact`} className="btn btn-primary">
        contact
      </Link>
      {user ? (
        <button className="btn btn-primary" onClick={handleSignout}>
          signout
        </button>
      ) : (
        <Link to={`/signin`} className="btn btn-primary">
          signin
        </Link>
      )}
      <div>{user?.name}</div>
    </div>
  );
};

export default memo(Header);
