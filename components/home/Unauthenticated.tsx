"use client";
import Link from "next/link";

const Unauthenticated = () => {
  {
    /* UNAUTHENTICATED COMPONENT THAT GOES SIGNIN PAGE */
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-slate-200">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Website</h1>
      <p className="text-xl mb-8">
        Get started with us by creating an account.
      </p>
      <Link href="/signin">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Unauthenticated;
