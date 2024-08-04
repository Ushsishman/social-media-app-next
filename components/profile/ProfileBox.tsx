"use client";
import BoxHeader from "./BoxHeader";
import BoxMain from "./BoxMain";
import { UserProfile } from "../../utilities/types";

const ProfileBox = ({ userId, user }: { userId: string; user: UserProfile }) => {
  return (
    <div className="bg-white min-h-5/6 w-1/2 shadow-lg my-16">
      <BoxHeader userId={userId} user={user} />
      <BoxMain userId={userId} user={user}/>
    </div>
  );
};

export default ProfileBox;
