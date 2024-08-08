"use client";
import SignedIn from "../components/header/SignedIn";
import NewUser from "../components/header/NewUser";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  {
    /* THERE ARE TWO DIFFERENT HEADERS BASED ON IF USER AUTHENTICATED OR NOT */
  }
  const { data: session, status } = useSession();

  return (
    <div className="h-14 bg-slate-800 text-white flex flex-row items-center justify-between px-6 shadow-lg">
      <div className="text-xl font-bold">
        <Link href="/">
          <button className="hover:text-gray-400">Logo</button>
        </Link>
      </div>
      {status === "authenticated" && <SignedIn />}
      {status === "unauthenticated" && <NewUser />}
    </div>
  );
};

export default Header;
