// store/rootReducer.ts
import { combineReducers } from 'redux';
import postReducer from "../lib/features/posts/postSlice";

const rootReducer = combineReducers({
  posts: postReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
