"use client";
import { getUser } from "../../utilities/utility";
import { useState, useEffect } from "react";
import Image from "next/image";
import { UserProfile } from "../../utilities/types";
import Link from "next/link";

const Follower = ({ followerId }: { followerId: string }) => {
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    getUser(followerId, setUser);
  }, []);

  return (
    <div>
      {user ? (
        <div className="flex flex-col items-center justify-center">
          <Image
            src={`${user.image}`}
            alt={user.name}
            className="m-4 rounded-full w-auto h-auto"
            width={200}
            height={200}
          />
          <Link href={`/profile/${followerId}`}>
            <p className="text-gray-700 font-bold text-xl">{user.name}</p>
          </Link>
        </div>
      ) : (
        <p>No user</p>
      )}
    </div>
  );
};

export default Follower;
