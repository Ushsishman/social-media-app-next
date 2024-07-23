"use client";
import { useSession, signOut } from "next-auth/react";

const Authenticated = () => {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <span className="text-lg font-bold">Hello {session?.user?.name}</span>
      <span className="text-lg font-bold">User id: {session?.user?.id}</span>
      <img
        width={24}
        height={24}
        src={`${session?.user?.image}`}
        alt={`${session?.user?.name}`}
        className="w-32 h-32 my-2 rounded-full"
      />
      <button
        className="btn bg-red-500 text-black font-medium text-lg p-4 rounded mt-2"
        onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Authenticated;
