"use client";
import { signOut } from "next-auth/react";

const SignedIn = () => {
  return (
    <ul className="flex flex-row space-x-4">
      <li>
        <p className="cursor-pointer hover:text-gray-400">Profile</p>
      </li>
      <li>
        <button className="hover:text-gray-400" onClick={() => signOut()}>
          Log Out
        </button>
      </li>
    </ul>
  );
};

export default SignedIn;
