"use client";
import { useState, useEffect } from "react";
import { getPosts } from "../../../utilities/utility";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState<object[]>([]);

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  return (
    <div className="min-h-screen w-1/3 bg-gray-500 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Feed</h1>
      {posts.length > 0 ? (
        posts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <p className="text-center text-black">No posts yet</p>
      )}
    </div>
  );
};

export default Feed;
