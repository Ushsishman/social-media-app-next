"use client";
import { Session } from "next-auth/core/types";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session: Session;
}

const SessionWrapper = ({ children, session }: Props) => {
  {
    /* THIS COMPONENT IS ABOUT NEXT AUTH LIBRARY */
  }
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionWrapper;
