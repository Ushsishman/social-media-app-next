"use client";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { Oval } from "react-loader-spinner";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  {
    /* THIS MAIN LAYOUT BASED ON AUTH */
  }
  const { status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <div className="h-screen flex items-center justify-center">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
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
