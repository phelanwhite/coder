"use client";
import AuthSidebarLeft from "@/components/layout/AuthSidebarLeft";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  useEffect(() => {
    if (!userId) redirect("/");
  }, [userId]);
  return (
    <div className="flex">
      <AuthSidebarLeft />
      <div className="flex-1 overflow-x-auto ">{children}</div>
    </div>
  );
};

export default AuthLayout;
