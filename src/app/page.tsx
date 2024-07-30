"use client";
import { useSession } from "next-auth/react";
import Authenticated from "../../components/home/Authenticated/Authenticated";
import Unauthenticated from "../../components/home/Unauthenticated";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <Authenticated />;
  }
  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }
}
