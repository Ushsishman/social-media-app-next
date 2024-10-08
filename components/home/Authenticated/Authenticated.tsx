"use client";
import Feed from "./Feed";
import CreatePost from "./CreatePost";
import { useEffect } from "react";
import { setFollowFollowerArray } from "../../../utilities/utility";
import { useSession } from "next-auth/react";

const Authenticated = () => {
  {
    /* THIS IS THE MAIN PART OF AUTHENTICATED PART */
  }
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.id !== undefined) {
      setFollowFollowerArray(session?.user.id);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-20 bg-slate-200">
      <CreatePost />
      <Feed />
    </div>
  );
};

export default Authenticated;
