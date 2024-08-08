"use client";
import { useEffect } from "react";
import { getPosts } from "../../../utilities/utility";
import Post from "./Post";
import { setPosts } from "../../../lib/features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../lib/store";

const Feed = () => {
  {
    /* THIS COMPONENT MAPS ALL POSTS BASED THEIR TIMESTAMP */
  }
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getPosts({ dispatch, setPosts });
  }, []);

  return (
    <div className="min-h-screen w-full md:w-1/2 bg-[#1E293B] py-8">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Feed</h1>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.timestamp} post={post} />)
      ) : (
        <p className="text-center text-black">No posts yet</p>
      )}
    </div>
  );
};

export default Feed;
