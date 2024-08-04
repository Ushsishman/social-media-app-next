"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { UserProfile } from "../../utilities/types";
import {
  followUser,
  checkIfFollowing,
  unFollowUser,
  deleteUser,
} from "../../utilities/utility";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import UpdateForm from "./UpdateForm";

const BoxHeader = ({ userId, user }: { userId: string; user: UserProfile }) => {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);

  const posts = useSelector((state: RootState) => state.posts.posts);
  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (session?.user.id) {
        await checkIfFollowing(session.user.id, userId, setIsFollowing);
      }
    };
    fetchFollowStatus();
  }, [session?.user.id, userId]);

  return (
    <div className="mx-6 py-3 border-b border-black">
      <h1 className="text-center text-xl">Profile: {userId}</h1>
      <div className="flex flex-row justify-between items-center mt-4">
        <div className="flex flex-row items-center">
          {user.image ? (
            <Image
              src={`${user.image}`}
              alt={`${user.name}`}
              className="mx-4 rounded-full w-auto h-auto"
              width={50}
              height={50}
            />
          ) : (
            <p>Loading...</p>
          )}

          <div className="flex flex-col">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>
        </div>
        {userId === session?.user.id ? (
          <div className="flex flex-col mx-4 items-center space-y-2">
            <button onClick={openModal}>
              <MdEdit size={24} />
            </button>
            <UpdateForm
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
            />
            <button onClick={() => deleteUser(session.user.id, posts, signOut)}>
              <MdDeleteForever size={24} />
            </button>
          </div>
        ) : (
          <>
            {isFollowing ? (
              <button
                onClick={() => {
                  if (session?.user.id) {
                    unFollowUser(userId, session.user.id);
                  }
                }}>
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  if (session?.user.id) {
                    followUser(userId, session.user.id);
                  }
                }}>
                Follow
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BoxHeader;
