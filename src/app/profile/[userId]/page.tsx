"use client";
import ProfileBox from "../../../../components/profile/ProfileBox";
import { useEffect, useState } from "react";
import { getUser } from "../../../../utilities/utility";
import { UserProfile } from "../../../../utilities/types";

const page = ({ params }: { params: { userId: string } }) => {
  {
    /* THIS IS DYNAMIC ROUTE PAGE OF USERS IDS */
  }
  const [user, setUser] = useState<UserProfile>({
    email: "",
    emailVerified: null,
    image: "",
    name: "",
    follows: [],
    followers: [],
  });

  useEffect(() => {
    getUser(params.userId, setUser);
  }, []);

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center">
      {user === null ? (
        <p>No user</p>
      ) : (
        <ProfileBox userId={params.userId} user={user} />
      )}
    </div>
  );
};

export default page;
