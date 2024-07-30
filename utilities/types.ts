export type FirebaseUser = {
  uid: string | null;
  name: string | null;
  email: string | null;
};

export interface PostsState {
  posts: any[];
  imageUrls: { [key: string]: string };
}

export type Post = {
  userId: string;
  name: string;
  email: string;
  status?: string | null;
  fileName?: string | null;
};

