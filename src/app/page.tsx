"use client";
import { useSession } from "next-auth/react";
import Authenticated from "../../components/home/Authenticated/Authenticated";
import Unauthenticated from "../../components/home/Unauthenticated";

const Home = () => {
  {
    /* HOMEPAGE OF APP, RENDERS BASED ON AUTH */
  }
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <Authenticated />;
  }
  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }

  return null;
};
export default Home;
