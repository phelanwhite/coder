import React, { memo } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = () => {
  return <ToastContainer position="top-center" />;
};

export default memo(Toastify);
