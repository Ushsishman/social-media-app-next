"use client";
import { Session } from "next-auth/core/types";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session: Session;
}

const SessionWrapper = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionWrapper;
