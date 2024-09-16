"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { FaTrello } from "react-icons/fa";

const Header = () => {
  return (
    <div className="z-[1000] flex items-center justify-between px-4 py-2 text-white bg-[#0066A0] border-b border-b-blue-500 sticky top-0 left-0 right-0">
      <Link
        href={`/`}
        className="text-xl font-semibold flex items-center gap-2"
      >
        <FaTrello />
        Trello
      </Link>
      <div className="flex items-center gap-3">
        <Link href={`/dashboard`} className="hover:underline">
          Dashboard
        </Link>
        <SignedOut>
          <SignInButton>
            <button className="hover:underline">Signin</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
