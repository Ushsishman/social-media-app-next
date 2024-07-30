"use client";
import Feed from "./Feed";
import CreatePost from "./CreatePost";

const Authenticated = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-20">
      <CreatePost />
      <Feed />
    </div>
  );
};

export default Authenticated;
