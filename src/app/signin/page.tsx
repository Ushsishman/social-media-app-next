"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Signin = () => {
  {
    /* THIS IS LOGIN,REGISTER METHOD OF APP */
  }
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen h-full flex-col items-center justify-center px-24 space-y-12 bg-slate-200">
        <h1 className="text-3xl font-semibold text-center">
          Create account with Google
        </h1>
        <button
          className="btn bg-blue-500 text-black font-medium text-lg p-4 rounded"
          onClick={() => {
            signIn("google").then(() => router.push("/"));
          }}>
          Login using Google
        </button>
      </div>
    );
  }
  if (status === "authenticated") {
    router.push("/");
  }
};

export default Signin;
