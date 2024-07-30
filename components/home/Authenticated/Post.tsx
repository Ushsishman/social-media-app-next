"use client";
import { useState, useEffect } from "react";
import {
  writeComment,
  getComments,
  getImage,
  likePost,
  unLikePost,
} from "../../../utilities/utility";
import { fireStoreDatabase } from "../../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Comment from "./Comment";
import { useSession } from "next-auth/react";

const Post = ({ post }: any) => {
  const [imgSrc, setImgSrc] = useState("");
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<object[]>([]);
  const [likerObj, setLikerObj] = useState<any>({});
  const session = useSession();

  const commentHandler = () => {
    writeComment(comment, post.userId, post.postId);
  };

  useEffect(() => {
    getComments(post.postId, setComments);
  }, []);

  useEffect(() => {
    getImage(post.fileName, setImgSrc);
  }, []);
  const getLiker = () => {
    {
      post.whoLiked.map((liker: any) => {
        if (liker.userId === session.data?.user.id) {
          setLikerObj(liker);
        } else {
          setLikerObj(null);
        }
      });
    }
  };
  useEffect(() => {
    getLiker();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 max-w-md mx-auto flex flex-col space-y-12">
      <div className="bg-gray-300 h-12 flex items-center justify-between px-3">
        <p className="text-gray-700 font-bold text-xl">{post.username}</p>

        {session.data?.user.id == post.userId && (
          <button
            onClick={async () =>
              await deleteDoc(doc(fireStoreDatabase, `posts/${post.postId}`))
            }>
            <MdDeleteForever size={24} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {post.status !== "no status" && (
          <p className="text-gray-700 mb-8 text-lg">{post.status}</p>
        )}

        {imgSrc && (
          <Image
            src={imgSrc}
            alt={post.fileName}
            className="mt-4 rounded w-auto h-auto"
            width={200}
            height={200}
          />
        )}
        <div>
          {post.whoLiked.length === 0 && (
            <button
              onClick={() => {
                likePost(session.data?.user.id, post.postId);
                setLikerObj({
                  userId: session.data?.user.id,
                  didLiked: "liked",
                });
              }}>
              <GoHeart size={30} color="red" />
            </button>
          )}
          {post.whoLiked.length > 0 && (
            <div>
              {likerObj !== null ? (
                <div>
                  {likerObj.didLiked === "liked" ? (
                    <button
                      onClick={() => {
                        unLikePost(session.data?.user.id, post.postId);
                        setLikerObj({
                          userId: session.data?.user.id,
                          didLiked: "disliked",
                        });
                      }}>
                      <GoHeartFill size={30} color="red" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        likePost(session.data?.user.id, post.postId);
                        setLikerObj({
                          userId: session.data?.user.id,
                          didLiked: "liked",
                        });
                      }}>
                      <GoHeart size={30} color="red" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    likePost(session.data?.user.id, post.postId);
                    setLikerObj({
                      userId: session.data?.user.id,
                      didLiked: "liked",
                    });
                  }}>
                  <GoHeart size={30} color="red" />
                </button>
              )}
            </div>
          )}

          <p>Beğenme sayısı: {post.likeCount}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Comments:</h2>

        {comments.length > 0 ? (
          <div className="flex flex-col">
            {comments.map((comment: any) => (
              <Comment
                key={comment.timestamp}
                comment={comment}
                postId={post.postId}
                userId={post.userId}
              />
            ))}
          </div>
        ) : (
          <span>No comments yet.</span>
        )}

        <input
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Add a comment"
          className="mt-2 p-2 border rounded w-full"
        />
        <button
          onClick={commentHandler}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Post;
