"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SignedIn = () => {
  {
    /* AUTHENTICATED HEADER SHOWS CURRENT USERS PROFILE AND LOGOUT FUNC */
  }
  const { data: session } = useSession();
  return (
    <ul className="flex flex-row space-x-4">
      <li>
        <Link href={`/profile/${session?.user.id}`}>
          <button className="cursor-pointer hover:text-gray-400">
            Profile
          </button>
        </Link>
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
