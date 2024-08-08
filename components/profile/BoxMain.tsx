"use client";
import BoxPost from "./BoxPost";
import { useState } from "react";
import BoxFollowing from "./BoxFollowing";
import BoxFollowers from "./BoxFollowers";
import { UserProfile } from "../../utilities/types";

const BoxMain = ({ userId, user }: { userId: string; user: UserProfile }) => {
  {
    /* THIS COMPONENT IS CONTENT PART OF PROFILE PAGE,YOU CAN LOOK THAT USERS POSTS,FOLLOWS OR FOLLOWERS */
  }
  const [currentMain, setCurrentMain] = useState(
    "posts" || "following" || "followers",
  );

  return (
    <div className="mx-6">
      <ul className="bg-slate-400 flex flex-row items-center justify-between text-center">
        <li
          className={`border-b-4 w-full ${
            currentMain === "posts" && "border-black"
          }`}>
          <button
            className="w-full py-2"
            onClick={() => setCurrentMain("posts")}>
            POSTS
          </button>
        </li>
        <li
          className={`border-b-4 w-full ${
            currentMain === "following" && "border-black"
          }`}>
          <button
            className="w-full py-2"
            onClick={() => setCurrentMain("following")}>
            FOLLOWING
          </button>
        </li>
        <li
          className={`border-b-4 w-full ${
            currentMain === "followers" && "border-black"
          }`}>
          <button
            className="w-full py-2"
            onClick={() => setCurrentMain("followers")}>
            FOLLOWERS
          </button>
        </li>
      </ul>

      {currentMain === "posts" && <BoxPost userId={userId} />}
      {currentMain === "following" && <BoxFollowing following={user.follows} />}
      {currentMain === "followers" && (
        <BoxFollowers followers={user.followers} />
      )}
    </div>
  );
};

export default BoxMain;
