import { fireStoreDatabase } from "../firebaseConfig";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  getDoc,
  collection,
  addDoc,
  arrayRemove,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Post } from "./types";
import { storage } from "../firebaseConfig";

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

const getPosts = (setPosts: Function) => {
  const unsubscribe = onSnapshot(
    collection(fireStoreDatabase, "posts"),
    (querySnapshot) => {
      const postArray: object[] = [];

      querySnapshot.forEach((doc) => {
        postArray.push(doc.data());
      });

      setPosts(postArray);
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

export {
  writeNewPost,
  getPosts,
  writeComment,
  deleteComment,
  getComments,
  getImage,
  likePost,
  unLikePost,
};
