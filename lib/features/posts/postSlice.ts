import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostsState } from "../../../utilities/types";

{/* THIS SLICE STORES POSTS */}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
