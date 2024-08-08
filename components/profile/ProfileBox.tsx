"use client";
import BoxHeader from "./BoxHeader";
import BoxMain from "./BoxMain";
import { UserProfile } from "../../utilities/types";

const ProfileBox = ({
  userId,
  user,
}: {
  userId: string;
  user: UserProfile;
}) => {
  {
    /* THIS IS THE MAIN BOX IN PROFILE PAGE */
  }
  return (
    <div className="bg-white min-h-5/6 w-full md:w-1/2 shadow-lg my-16">
      <BoxHeader userId={userId} user={user} />
      <BoxMain userId={userId} user={user} />
    </div>
  );
};

export default ProfileBox;
