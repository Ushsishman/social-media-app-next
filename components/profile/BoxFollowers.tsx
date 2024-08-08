"use client";
import Follower from "./Follower";

const BoxFollowers = ({ followers }: { followers: string[] }) => {
  {
    /* THIS MAPS FOLLOWERS IN PROFILE PAGE */
  }
  return (
    <div>
      {followers.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {followers.map((follower) => (
            <Follower key={follower} followerId={follower} />
          ))}
        </div>
      ) : (
        <p>No follower</p>
      )}
    </div>
  );
};

export default BoxFollowers;
