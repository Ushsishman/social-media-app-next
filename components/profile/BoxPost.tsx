"use client";
import Post from "../home/Authenticated/Post";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../lib/store";
import { useEffect } from "react";
import { getPosts } from "../../utilities/utility";
import { setPosts } from "../../lib/features/posts/postSlice";

const BoxPost = ({ userId }: { userId: string }) => {
  {
    /* THIS COMPONENT MAPS POSTS BASED ON USER */
  }
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts({ dispatch, setPosts });
  }, []);

  const posts = useSelector((state: RootState) => state.posts.posts);
  const filteredPosts = posts.filter((post) => {
    if (post.userId === userId) {
      return post;
    }
  });

  return (
    <div className="min-h-screen w-full bg-[#1E293B] py-8">
      <h1 className="text-white text-3xl font-bold text-center mb-6">Posts</h1>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <Post key={post.timestamp} post={post} />)
      ) : (
        <p className="text-center text-black">No posts yet</p>
      )}
    </div>
  );
};

export default BoxPost;
