"use client";
import Header from "./Header";
import { useSession } from "next-auth/react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          <Header />
          {children}
        </>
      )}
    </>
  );
};

export default MainLayout;
