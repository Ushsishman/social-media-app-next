export type FirebaseUser = {
  uid: string | null;
  name: string | null;
  email: string | null;
};

export type PostsState = {
  posts: Post[];
}

export type Post = {
  userId: string;
  name: string;
  email: string;
  status?: string | null;
  fileName?: string | null;
};

export type UserProfile = {
  email: string;
  emailVerified: null;
  image: string;
  name: string;
  follows: string[];
  followers: string[];
}

export type UpdateProfile = {
  email: string;
  name: string;
  image: string;
}