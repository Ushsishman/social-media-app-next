import { fireStoreDatabase } from "../firebaseConfig";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  collection,
  arrayRemove,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Post,UpdateProfile } from "./types";
import { storage } from "../firebaseConfig";

const setFollowFollowerArray = async (userId: string) => {
  const userRef = doc(fireStoreDatabase, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  if (userData) {
    if (!userData.followers && !userData.follows) {
      await updateDoc(userRef, {
        followers: [],
        follows: [],
      });
    }
  }
};

const writeNewPost = async ({
  userId,
  name,
  email,
  status,
  fileName,
}: Post) => {
  const postsRef = doc(collection(fireStoreDatabase, "posts"));

  if (status !== "no status" || fileName !== "no file") {
    await setDoc(postsRef, {
      username: name,
      userId: userId,
      email: email,
      status: status,
      fileName: fileName,
      postId: postsRef.id,
      likeCount: 0,
      whoLiked: [],
    });
  } else {
    alert("You have to add status or file");
  }
};

const getPosts = ({ dispatch, setPosts }: { dispatch: any; setPosts: any }) => {
  const unsubscribe = onSnapshot(
    collection(fireStoreDatabase, "posts"),
    (querySnapshot) => {
      const postArray: object[] = [];

      querySnapshot.forEach((doc) => {
        postArray.push(doc.data());
      });

      dispatch(setPosts(postArray));
    },
    (error) => {
      console.log(error);
    },
  );
  return () => unsubscribe();
};

const writeComment = async (
  comment: string,
  userId: string,
  postId: string,
) => {
  const postRef = doc(fireStoreDatabase, `posts/${postId}`);
  const newComment = {
    comment,
    timestamp: new Date().toISOString(),
    userId,
  };
  await updateDoc(postRef, {
    comments: arrayUnion(newComment),
  });
};

const getComments = (postId: string, setComments: Function) => {
  const unsubscribe = onSnapshot(
    doc(fireStoreDatabase, `posts/${postId}`),
    (postSnap) => {
      let comments = [];
      if (postSnap.exists()) {
        const postData = postSnap.data();
        setComments(postData.comments || []);
      } else {
        console.log("No such document!");
        setComments([]);
      }
    },
  );
  return () => unsubscribe();
};

const getImage = async (fileName: string, setImgSrc: Function) => {
  if (fileName !== "no file") {
    const imageReference = ref(storage, `images/${fileName}`);
    const imageUrl = await getDownloadURL(imageReference);
    setImgSrc(imageUrl);
  }
};

const deleteComment = async (comment: object, postId: string) => {
  const postRef = doc(fireStoreDatabase, "posts", postId);
  await updateDoc(postRef, {
    comments: arrayRemove(comment),
  });
};

const likePost = async (userId: string | undefined, postId: string) => {
  const postRef = doc(fireStoreDatabase, `posts/${postId}`);
  const postSnap = await getDoc(postRef);
  const postData = postSnap.data();
  if (userId !== undefined && postData !== undefined) {
    const likeObj = {
      userId: userId,
      didLiked: "liked",
    };
    await updateDoc(postRef, {
      likeCount: postData.likeCount + 1,
      whoLiked: arrayUnion(likeObj),
    });
  }
};

const unLikePost = async (userId: string | undefined, postId: string) => {
  const postRef = doc(fireStoreDatabase, `posts/${postId}`);
  const postSnap = await getDoc(postRef);
  const postData = postSnap.data();
  if (userId !== undefined && postData !== undefined) {
    const unlikeObj = {
      userId: userId,
      didLiked: "liked",
    };
    await updateDoc(postRef, {
      likeCount: postData.likeCount - 1,
      whoLiked: arrayRemove(unlikeObj),
    });
  }
};

const getUser = async (userId: string, setUser: Function) => {
  const userRef = doc(fireStoreDatabase, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    setUser(userData);
  } else {
    setUser(null);
  }
};

const followUser = async (profileId: string, followerId: string) => {
  const profileRef = doc(fireStoreDatabase, `users/${profileId}`);
  const followerRef = doc(fireStoreDatabase, `users/${followerId}`);

  await updateDoc(profileRef, {
    followers: arrayUnion(followerId),
  });

  await updateDoc(followerRef, {
    follows: arrayUnion(profileId),
  });
};

const unFollowUser = async (profileId: string, followerId: string) => {
  const profileRef = doc(fireStoreDatabase, `users/${profileId}`);
  const followerRef = doc(fireStoreDatabase, `users/${followerId}`);

  await updateDoc(profileRef, {
    followers: arrayRemove(followerId),
  });

  await updateDoc(followerRef, {
    follows: arrayRemove(profileId),
  });
};

const checkIfFollowing = async (
  userId: string,
  profileId: string,
  setIsFollowing: Function,
) => {
  const userDocRef = doc(fireStoreDatabase, "users", userId);

  const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      setIsFollowing(userData.follows.includes(profileId));
    } else {
      setIsFollowing(false);
    }
  });

  return () => unsubscribe();
};

const deleteUser = async (
  userId: string,
  posts: object[],
  signOut: Function,
) => {
  const userRef = doc(fireStoreDatabase, `users/${userId}`);
  await deleteDoc(userRef);

  posts.map(async (post: any) => {
    if (userId === post.userId) {
      const postRef = doc(fireStoreDatabase, `posts/${post.postId}`);
      await deleteDoc(postRef).finally(signOut());
    }
  });
};

const updateUser = async (userId: string, updatedData: UpdateProfile) => {
  const userRef = doc(fireStoreDatabase, `users/${userId}`);
  
  await updateDoc(userRef, {
    name: updatedData.name,
    email: updatedData.email,
    image: updatedData.image,
  })
};

export {
  writeNewPost,
  getPosts,
  writeComment,
  deleteComment,
  getComments,
  getImage,
  likePost,
  unLikePost,
  getUser,
  followUser,
  setFollowFollowerArray,
  checkIfFollowing,
  unFollowUser,
  deleteUser,
  updateUser,
};
