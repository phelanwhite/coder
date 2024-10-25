import React from "react";

const AuthProtected = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default AuthProtected;
