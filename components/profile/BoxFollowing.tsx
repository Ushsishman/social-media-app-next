"use client";
import Following from "./Following";

const BoxFollowing = ({ following }: { following: string[] }) => {
  return (
    <div>
      {following.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {following.map((following) => (
            <Following followingId={following} />
          ))}
        </div>
      ) : (
        <p>No follows</p>
      )}
    </div>
  );
};

export default BoxFollowing;
