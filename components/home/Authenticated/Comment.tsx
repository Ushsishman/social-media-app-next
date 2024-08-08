"use client";
import { MdDeleteForever } from "react-icons/md";
import { deleteComment } from "../../../utilities/utility";
import { useSession } from "next-auth/react";

const Comment = ({
  comment,
  postId,
  userId,
}: {
  comment: any;
  postId: string;
  userId: string;
}) => {
  {
    /* COMMENT COMPONENT */
  }
  const session = useSession();

  return (
    <div className="my-1 flex flex-row justify-between items-center">
      <p className="text-gray-600">
        {comment.userName}: {comment.comment}
      </p>
      {session.data?.user.id == userId && (
        <button
          onClick={async () => {
            deleteComment(comment, postId);
          }}>
          <MdDeleteForever size={24} />
        </button>
      )}
    </div>
  );
};

export default Comment;
