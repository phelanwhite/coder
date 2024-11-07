import { memo } from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return <Outlet />;
};

export default memo(PublicLayout);
